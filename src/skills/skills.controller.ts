import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { SkillService } from './skills.service';
import { AgentService } from './agent.service';
import { Skill, Parameter } from './skills.interface';

// For Swagger documentation only
export class ParameterDto implements Parameter {
  @ApiProperty({ example: 'num1', description: 'The name of the parameter' })
  name: string;

  @ApiProperty({ example: 'number', description: 'The type of the parameter' })
  type: string;

  @ApiProperty({ example: 'The first number to add', description: 'The description of the parameter' })
  description: string;
}

export class SkillDto implements Skill {
  @ApiProperty({ example: 'addNumbers', description: 'The name of the skill' })
  name: string;

  @ApiProperty({ example: 'Adds two numbers', description: 'The description of the skill' })
  description: string;

  @ApiProperty({ example: 'function addNumbers(a: number, b: number): number { return a + b; }', description: 'The code of the skill' })
  code: string;

  @ApiProperty({ type: [ParameterDto], description: 'The parameters of the skill' })
  parameters: Parameter[];
}

export class ExecuteSkillDto {
  @ApiProperty({ type: 'array', items: { type: 'any' }, description: 'The parameters to execute the skill with' })
  params: any[];
}

@ApiTags('skills')
@Controller('skills')
export class SkillController {
  constructor(
    private readonly skillService: SkillService,
    private readonly agentService: AgentService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ status: 200, description: 'Return all skills.', type: [SkillDto] })
  getAllSkills(): Promise<Skill[]> {
    return this.skillService.getAllSkills();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get a skill by name' })
  @ApiParam({ name: 'name', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the skill.', type: SkillDto })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  async getSkill(@Param('name') name: string): Promise<Skill> {
    const skill = await this.skillService.getSkill(name);
    if (!skill) {
      throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
    }
    return skill;
  }

  @Post()
  @ApiOperation({ summary: 'Add a new skill' })
  @ApiBody({ type: SkillDto })
  @ApiResponse({ status: 201, description: 'The skill has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  addSkill(@Body() skill: Skill): Promise<void> {
    return this.skillService.addSkill(skill);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate a new skill' })
  @ApiBody({ schema: { properties: { taskDescription: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'The skill has been successfully generated.' })
  @ApiResponse({ status: 500, description: 'Skill generation failed.' })
  async generateSkill(@Body('taskDescription') taskDescription: string): Promise<void> {
    try {
      await this.agentService.generateSkill(taskDescription);
    } catch (error) {
      throw new HttpException('Skill generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':name/execute')
  @ApiOperation({ summary: 'Execute a skill' })
  @ApiParam({ name: 'name', type: 'string', description: 'The name of the skill to execute' })
  @ApiBody({ type: ExecuteSkillDto })
  @ApiResponse({ 
    status: 200, 
    description: 'The skill has been successfully executed.',
    schema: {
      type: 'object',
      properties: {
        result: {
          type: 'object',
          description: 'The result of the skill execution. The type varies depending on the skill.',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  @ApiResponse({ status: 500, description: 'Skill execution failed.' })
  async executeSkill(@Param('name') name: string, @Body() executeSkillDto: ExecuteSkillDto): Promise<{ result: any }> {
    try {
      const result = await this.skillService.executeSkill(name, executeSkillDto.params);
      return { result };
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new HttpException('Skill not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(`Skill execution failed: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}