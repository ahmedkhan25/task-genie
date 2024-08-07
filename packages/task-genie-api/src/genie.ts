import { Genie, TaskStatus } from './genie.interface';


export const genie: Genie = {
    SessionID: '',
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