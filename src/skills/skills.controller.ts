import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { SkillService } from './skills.service'; 
import { Skill } from './skills.interface';  

@Controller('Skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

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

  @Post(':name/execute')
  async executeSkill(@Param('name') name: string): Promise<void> {
    try {
      await this.skillService.executeSkill(name);
    } catch (error) {
      throw new HttpException('Skill execution failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}