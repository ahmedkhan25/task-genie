import { Injectable } from '@nestjs/common';
import { Skill } from './skills.interface';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Genie, TaskStatus } from '../genie.interface';
import { genie } from '../genie';
import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class AgentService {
  private basePrompt: string;
  private skillsFilePath = path.join(__dirname, '../../SkillLibrary/skills.json');
  private maxRetries = 4;

  constructor(private readonly openAIService: OpenAIService) {}

  private async loadPrompt(): Promise<void> {
    try {
      this.basePrompt = await this.openAIService.loadPrompt();
    } catch (error) {
      console.error('Error loading prompt from prompt library:', error);
      throw error;
    }
  }

  async generateSkill(taskDescription: string, retryCount = 0): Promise<void> {
    if (retryCount === 0) {
      genie.SessionID = uuidv4();
      genie.CurrentActiveTask = taskDescription;
      genie.TaskStatus = TaskStatus.Active;
    }

    try {
      if (!this.basePrompt) {
        await this.loadPrompt();
      }

      genie.ActivePrompt = this.basePrompt.replace('{TASK DESCRIPTION}', taskDescription);

      const skillResponse = await this.openAIService.callOpenAIChatCompletion(genie);
      const skill = this.parseSkillResponse(skillResponse);

      await this.saveSkill(skill);
      
      genie.TasksCompleted.push(skill.name);
      genie.Log.push(`Generated skill: ${skill.name}`);
      genie.TaskStatus = TaskStatus.Completed;
    } catch (error) {
      console.error(`Error generating skill (attempt ${retryCount + 1}):`, error);
      genie.Log.push(`Error generating skill (attempt ${retryCount + 1}): ${error.message}`);

      if (retryCount < this.maxRetries) {
        genie.Log.push(`Retrying... (${retryCount + 1}/${this.maxRetries})`);
        return this.generateSkill(taskDescription, retryCount + 1);
      } else {
        genie.TaskStatus = TaskStatus.Error;
        throw new Error(`Failed to generate skill after ${this.maxRetries} attempts: ${error.message}`);
      }
    }
  }

  private parseSkillResponse(skillResponse: string): Skill {
    try {
      console.log('skillResponse from GPT is: ', skillResponse);
      const parsedResponse = JSON.parse(skillResponse);
      if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
        const skillData = parsedResponse[0];
        const extractedName = this.extractSkillName(skillData.code);
        return {
          name: extractedName,
          description: skillData.description,
          code: skillData.code,
        };
      }
      throw new Error('Invalid skill response format');
    } catch (error) {
      console.error('Error parsing skill response:', error);
      throw error;
    }
  }

  private extractSkillName(code: string): string {
    const functionMatch = code.match(/function\s+(\w+)/);
    const constMatch = code.match(/export const (\w+)/);
    return (functionMatch && functionMatch[1]) || (constMatch && constMatch[1]);
  }

  private async saveSkill(skill: Skill): Promise<void> {
    try {
      const skills = await this.readSkillsFromFile();
      skills.push(skill);
      await this.writeSkillsToFile(skills);

      const skillTsPath = path.join(__dirname, '..', '..', 'SkillLibrary', `${skill.name}.ts`);
      await fs.writeFile(skillTsPath, skill.code, 'utf8');
    } catch (error) {
      console.error('Error saving skill:', error);
      throw error;
    }
  }

  private async readSkillsFromFile(): Promise<Skill[]> {
    try {
      const data = await fs.readFile(this.skillsFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, return an empty array
        return [];
      }
      throw error;
    }
  }

  private async writeSkillsToFile(skills: Skill[]): Promise<void> {
    await fs.writeFile(this.skillsFilePath, JSON.stringify(skills, null, 2), 'utf8');
  }
}