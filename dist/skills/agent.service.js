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
exports.AgentService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
const genie_interface_1 = require("../genie.interface");
const genie_1 = require("../genie");
const openai_service_1 = require("../openai/openai.service");
let AgentService = class AgentService {
    constructor(openAIService) {
        this.openAIService = openAIService;
        this.skillsFilePath = path.join(__dirname, '../../SkillLibrary/skills.json');
        this.maxRetries = 4;
    }
    async loadPrompt() {
        try {
            this.basePrompt = await this.openAIService.loadPrompt();
        }
        catch (error) {
            console.error('Error loading prompt from prompt library:', error);
            throw error;
        }
    }
    async generateSkill(taskDescription, retryCount = 0) {
        if (retryCount === 0) {
            genie_1.genie.CurrentActiveTask = taskDescription;
            genie_1.genie.TaskStatus = genie_interface_1.TaskStatus.Active;
        }
        try {
            if (!this.basePrompt) {
                await this.loadPrompt();
            }
            genie_1.genie.ActivePrompt = this.basePrompt.replace('{TASK DESCRIPTION}', taskDescription);
            const skillResponse = await this.openAIService.callOpenAIChatCompletion(genie_1.genie);
            const skill = this.parseSkillResponse(skillResponse);
            await this.saveSkill(skill);
            genie_1.genie.TasksCompleted.push(skill.name);
            genie_1.genie.Log.push(`Generated skill: ${skill.name}`);
            genie_1.genie.TaskStatus = genie_interface_1.TaskStatus.Completed;
        }
        catch (error) {
            console.error(`Error generating skill (attempt ${retryCount + 1}):`, error);
            genie_1.genie.Log.push(`Error generating skill (attempt ${retryCount + 1}): ${error.message}`);
            if (retryCount < this.maxRetries) {
                genie_1.genie.Log.push(`Retrying... (${retryCount + 1}/${this.maxRetries})`);
                return this.generateSkill(taskDescription, retryCount + 1);
            }
            else {
                genie_1.genie.TaskStatus = genie_interface_1.TaskStatus.Error;
                throw new Error(`Failed to generate skill after ${this.maxRetries} attempts: ${error.message}`);
            }
        }
    }
    parseSkillResponse(skillResponse) {
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
        }
        catch (error) {
            console.error('Error parsing skill response:', error);
            throw error;
        }
    }
    extractSkillName(code) {
        const functionMatch = code.match(/function\s+(\w+)/);
        const constMatch = code.match(/export const (\w+)/);
        return (functionMatch && functionMatch[1]) || (constMatch && constMatch[1]);
    }
    async saveSkill(skill) {
        try {
            const skills = await this.readSkillsFromFile();
            skills.push(skill);
            await this.writeSkillsToFile(skills);
            const skillTsPath = path.join(__dirname, '..', '..', 'SkillLibrary', `${skill.name}.ts`);
            await fs_1.promises.writeFile(skillTsPath, skill.code, 'utf8');
        }
        catch (error) {
            console.error('Error saving skill:', error);
            throw error;
        }
    }
    async readSkillsFromFile() {
        try {
            const data = await fs_1.promises.readFile(this.skillsFilePath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            throw error;
        }
    }
    async writeSkillsToFile(skills) {
        await fs_1.promises.writeFile(this.skillsFilePath, JSON.stringify(skills, null, 2), 'utf8');
    }
};
exports.AgentService = AgentService;
exports.AgentService = AgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [openai_service_1.OpenAIService])
], AgentService);
//# sourceMappingURL=agent.service.js.map