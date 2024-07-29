import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as tsNode from 'ts-node';
import { Skill } from './skills.interface'; 
import { genie } from '../genie';

@Injectable()
export class SkillService {
  private skillsFilePath = path.join(__dirname, '../../SkillLibrary/skills.json');

  constructor() {
    tsNode.register({
      transpileOnly: true,
      compilerOptions: {
        module: 'commonjs'
      }
    });
  }

  async getAllSkills(): Promise<Skill[]> {
    const skills = await this.readSkillsFromFile();
    return skills;
  }

  async getSkill(name: string): Promise<Skill | undefined> {
    const skills = await this.readSkillsFromFile();
    return skills.find(skill => skill.name === name);
  }

  async addSkill(skill: Skill): Promise<void> {
    const skills = await this.readSkillsFromFile();
    skills.push(skill);
    await this.writeSkillsToFile(skills);
    await this.writeSkillFile(skill);
  }

  async executeSkill(name: string): Promise<void> {
    console.log('trying skill :', name);
    try {
      const skillPath = path.join(__dirname, `../../SkillLibrary/${name}.ts`);
      const { exampleSkill } = await import(skillPath);
      exampleSkill();
    } catch (error) {
      // Handle the error here
      console.error('Error executing imported skill:', error);
    }
  }

  private async readSkillsFromFile(): Promise<Skill[]> {
    const data = await fs.readFile(this.skillsFilePath, 'utf8');
    return JSON.parse(data);
  }

  private async writeSkillsToFile(skills: Skill[]): Promise<void> {
    await fs.writeFile(this.skillsFilePath, JSON.stringify(skills, null, 2), 'utf8');
  }

  private async writeSkillFile(skill: Skill): Promise<void> {
    const skillTsPath = path.join(__dirname, `../../SkillLibrary/${skill.name}.ts`);
    const skillTxtPath = path.join(__dirname, `../../SkillLibrary/${skill.name}.txt`);

    await fs.writeFile(skillTsPath, skill.code, 'utf8');
    await fs.writeFile(skillTxtPath, skill.description, 'utf8');
  }
}