import { ConfigService } from '@nestjs/config';
import { Genie } from '../genie.interface';
export declare class OpenAIService {
    private configService;
    constructor(configService: ConfigService);
    loadPrompt(): Promise<string>;
    callOpenAIChatCompletion(genie: Genie): Promise<string>;
}
