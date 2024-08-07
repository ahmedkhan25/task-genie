import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Genie } from '../genie.interface';
import { promises as fs } from 'fs';
import * as path from 'path';

interface ChatCompletionRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
 // response_format: { type: string };
}

interface SkillResponse {
  name: string;
  description: string;
  code: string;
  parameters: Array<{
    name: string;
    type: string;
    description: string;
  }>;
}


interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
@Injectable()
export class OpenAIService {
  constructor(private configService: ConfigService) {
    this.loadPrompt();
  }

  public async loadPrompt(): Promise<string> {
    const promptPath = path.join(__dirname, '..', '..', 'SkillLibrary', 'prompts', 'generateSkillPrompt.txt');
    try {
      return await fs.readFile(promptPath, 'utf8');
    } catch (error) {
      console.error('Error loading prompt:', error);
      throw error;
    }
  }

  async callOpenAIChatCompletion(genie: Genie): Promise<string> {
    const url = 'https://api.openai.com/v1/chat/completions';
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey) {
      throw new Error('OpenAI API key is not defined');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };

    const data: ChatCompletionRequest = {
      model: 'gpt-4',
      messages: [
        { role: 'user', content: genie.ActivePrompt }
      ]
    };

    try {
      const response = await axios.post<ChatCompletionResponse>(url, data, { headers });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }
}