import { OpenAIService } from '../openai/openai.service';
export declare class AgentService {
    private readonly openAIService;
    private basePrompt;
    private skillsFilePath;
    private maxRetries;
    constructor(openAIService: OpenAIService);
    private loadPrompt;
    generateSkill(taskDescription: string, retryCount?: number): Promise<void>;
    private parseSkillResponse;
    private extractSkillName;
    private saveSkill;
    private readSkillsFromFile;
    private writeSkillsToFile;
}
