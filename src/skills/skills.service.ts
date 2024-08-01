import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as tsNode from 'ts-node';
import * as ts from 'typescript';
import { Skill, Parameter } from './skills.interface'; 
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

  async executeSkill(name: string, params: any[]): Promise<any> {
    console.log('Trying to execute skill:', name);
    try {
      const skill = await this.getSkill(name);
      if (!skill) {
        throw new Error(`Skill ${name} not found`);
      }

      this.validateParameters(skill, params);

      const skillPath = path.join(__dirname, `../../SkillLibrary/${name}.ts`);
      console.log('Skill path:', skillPath);
      
      const fileContent = await fs.readFile(skillPath, 'utf8');
      
      const result = ts.transpileModule(fileContent, {
        compilerOptions: { module: ts.ModuleKind.CommonJS }
      });
      
      const skillFunction = new Function(...skill.parameters.map(p => p.name), `return (${result.outputText})(...arguments)`);
      
      const executionResult = skillFunction(...params);
      console.log(`Skill ${name} executed successfully.`);
      return executionResult;
    } catch (error) {
      console.error('Error executing skill:', error);
      throw new Error(`Failed to execute skill ${name}: ${error.message}`);
    }
  }

  private validateParameters(skill: Skill, params: any[]): void {
    if (params.length !== skill.parameters.length) {
      throw new Error(`Incorrect number of parameters for skill ${skill.name}. Expected ${skill.parameters.length}, got ${params.length}`);
    }

    skill.parameters.forEach((param, index) => {
      if (typeof params[index] !== param.type.toLowerCase()) {
        throw new Error(`Invalid type for parameter ${param.name}. Expected ${param.type}, got ${typeof params[index]}`);
      }
    });
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
    await fs.writeFile(skillTsPath, skill.code, 'utf8');
  }
}