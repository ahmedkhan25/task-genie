import { OpenAIService } from '../openai/openai.service';
export declare class AgentService {
    private readonly openAIService;
    private basePrompt;
    private skillsFilePath;
    constructor(openAIService: OpenAIService);
    private loadPrompt;
    generateSkill(taskDescription: string): Promise<void>;
    private parseSkillResponse;
    private extractSkillName;
    private saveSkill;
    private readSkillsFromFile;
    private writeSkillsToFile;
}
