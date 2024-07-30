import { Genie, TaskStatus } from './genie.interface';
import { v4 as uuidv4 } from 'uuid'; // UUID library for generating unique SessionID


export const genie: Genie = {
    SessionID: uuidv4(),
    LLM_API_Key: process.env.OpenAI_API_KEY || '',
    TasksCompleted: [],
    WelcomeMessage: 'Welcome to Task Genie',
    ChatMessage: '',
    ActivePrompt: '',
    TaskStatus: TaskStatus.NotStarted,
    CurrentActiveTask: '',
    SessionVariables: {},
    Log: [],
};