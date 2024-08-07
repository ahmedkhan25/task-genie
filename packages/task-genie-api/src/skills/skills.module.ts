import { Module } from '@nestjs/common';
import { SkillController } from './skills.controller';
import { SkillService } from './skills.service';
import { AgentService } from './agent.service';
import { OpenAIService } from '../openai/openai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule], // Import HttpModule to use HttpService in OpenAIService
  controllers: [SkillController],
  providers: [SkillService, AgentService, OpenAIService],
})
export class SkillsModule {}