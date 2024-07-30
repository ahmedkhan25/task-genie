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
exports.OpenAIService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const fs_1 = require("fs");
const path = require("path");
let OpenAIService = class OpenAIService {
    constructor(configService) {
        this.configService = configService;
        this.loadPrompt();
    }
    async loadPrompt() {
        const promptPath = path.join(__dirname, '..', '..', 'SkillLibrary', 'prompts', 'generateSkillPrompt.txt');
        try {
            return await fs_1.promises.readFile(promptPath, 'utf8');
        }
        catch (error) {
            console.error('Error loading prompt:', error);
            throw error;
        }
    }
    async callOpenAIChatCompletion(genie) {
        const url = 'https://api.openai.com/v1/chat/completions';
        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey) {
            throw new Error('OpenAI API key is not defined');
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };
        const data = {
            model: 'gpt-4',
            messages: [
                { role: 'user', content: genie.ActivePrompt }
            ]
        };
        try {
            const response = await axios_1.default.post(url, data, { headers });
            return response.data.choices[0].message.content;
        }
        catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw error;
        }
    }
};
exports.OpenAIService = OpenAIService;
exports.OpenAIService = OpenAIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenAIService);
//# sourceMappingURL=openai.service.js.map