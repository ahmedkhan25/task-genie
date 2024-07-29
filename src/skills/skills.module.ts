import { Module } from '@nestjs/common';
import { SkillController } from './skills.controller';
import { SkillService } from './skills.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
})
export class TaskModule {}
