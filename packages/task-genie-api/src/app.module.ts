import { Module } from '@nestjs/common';
import { SkillsModule } from './skills/skills.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SkillsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}