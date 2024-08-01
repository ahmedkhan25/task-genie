"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
const tsNode = require("ts-node");
const ts = require("typescript");
let SkillService = class SkillService {
    constructor() {
        this.skillsFilePath = path.join(__dirname, '../../SkillLibrary/skills.json');
        tsNode.register({
            transpileOnly: true,
            compilerOptions: {
                module: 'commonjs'
            }
        });
    }
    async getAllSkills() {
        const skills = await this.readSkillsFromFile();
        return skills;
    }
    async getSkill(name) {
        const skills = await this.readSkillsFromFile();
        return skills.find(skill => skill.name === name);
    }
    async addSkill(skill) {
        const skills = await this.readSkillsFromFile();
        skills.push(skill);
        await this.writeSkillsToFile(skills);
        await this.writeSkillFile(skill);
    }
    async executeSkill(name, params) {
        console.log('Trying to execute skill:', name);
        try {
            const skill = await this.getSkill(name);
            if (!skill) {
                throw new Error(`Skill ${name} not found`);
            }
            this.validateParameters(skill, params);
            const skillPath = path.join(__dirname, `../../SkillLibrary/${name}.ts`);
            console.log('Skill path:', skillPath);
            const fileContent = await fs_1.promises.readFile(skillPath, 'utf8');
            const result = ts.transpileModule(fileContent, {
                compilerOptions: { module: ts.ModuleKind.CommonJS }
            });
            const skillFunction = new Function(...skill.parameters.map(p => p.name), `return (${result.outputText})(...arguments)`);
            const executionResult = skillFunction(...params);
            console.log(`Skill ${name} executed successfully.`);
            return executionResult;
        }
        catch (error) {
            console.error('Error executing skill:', error);
            throw new Error(`Failed to execute skill ${name}: ${error.message}`);
        }
    }
    validateParameters(skill, params) {
        if (params.length !== skill.parameters.length) {
            throw new Error(`Incorrect number of parameters for skill ${skill.name}. Expected ${skill.parameters.length}, got ${params.length}`);
        }
        skill.parameters.forEach((param, index) => {
            if (typeof params[index] !== param.type.toLowerCase()) {
                throw new Error(`Invalid type for parameter ${param.name}. Expected ${param.type}, got ${typeof params[index]}`);
            }
        });
    }
    async readSkillsFromFile() {
        const data = await fs_1.promises.readFile(this.skillsFilePath, 'utf8');
        return JSON.parse(data);
    }
    async writeSkillsToFile(skills) {
        await fs_1.promises.writeFile(this.skillsFilePath, JSON.stringify(skills, null, 2), 'utf8');
    }
    async writeSkillFile(skill) {
        const skillTsPath = path.join(__dirname, `../../SkillLibrary/${skill.name}.ts`);
        await fs_1.promises.writeFile(skillTsPath, skill.code, 'utf8');
    }
};
exports.SkillService = SkillService;
exports.SkillService = SkillService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SkillService);
//# sourceMappingURL=skills.service.js.map