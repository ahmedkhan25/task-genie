import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { SkillService } from './skills.service';
import { AgentService } from './agent.service';
import { Skill } from './skills.interface';

@Controller('skills')
export class SkillController {
  constructor(
    private readonly skillService: SkillService,
    private readonly agentService: AgentService
  ) {}

  @Get()
  getAllSkills(): Promise<Skill[]> {
    return this.skillService.getAllSkills();
  }

  @Get(':name')
  getSkill(@Param('name') name: string): Promise<Skill | undefined> {
    return this.skillService.getSkill(name);
  }

  @Post()
  addSkill(@Body() Skill: Skill): Promise<void> {
    return this.skillService.addSkill(Skill);
  }

  @Post('generate')
  async generateSkill(@Body('taskDescription') taskDescription: string): Promise<void> {
    try {
      await this.agentService.generateSkill(taskDescription);
    } catch (error) {
      throw new HttpException('Skill generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':name/execute')
  async executeSkill(@Param('name') name: string): Promise<void> {
    try {
      await this.skillService.executeSkill(name);
    } catch (error) {
      throw new HttpException('Skill execution failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}