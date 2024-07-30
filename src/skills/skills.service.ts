import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as tsNode from 'ts-node';
import * as ts from 'typescript';
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
    //write to json file:
    await this.writeSkillsToFile(skills);
    //write to .ts file:
    await this.writeSkillFile(skill);
  }


   async executeSkill(name: string): Promise<any> {
    console.log('Trying to execute skill:', name);
    try {
      const skillPath = path.join(__dirname, `../../SkillLibrary/${name}.ts`);
      console.log('Skill path:', skillPath);
      
      const fileContent = await fs.readFile(skillPath, 'utf8');
      
      const result = ts.transpileModule(fileContent, {
        compilerOptions: { module: ts.ModuleKind.CommonJS }
      });
      
      const skillFunction = new Function(`return ${result.outputText}`)();
      
      if (typeof skillFunction === 'function') {
        const executionResult = skillFunction();
        console.log(`Skill ${name} executed successfully.`);
        return executionResult;
      } else {
        throw new Error('The skill file does not contain a valid function');
      }
    } catch (error) {
      console.error('Error executing skill:', error);
      throw new Error(`Failed to execute skill ${name}: ${error.message}`);
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
  

    await fs.writeFile(skillTsPath, skill.code, 'utf8');
   
  }
}