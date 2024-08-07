export enum TaskStatus {
    NotStarted = 'NotStarted',
    Waiting = 'Waiting',
    Active = 'Active',
    Completed = 'Completed',
    Error = 'Error',
  }
  
  export interface SessionVariables {
    [key: string]: string;
  }
  
  export interface Genie {
    SessionID: string;
    LLM_API_Key: string;
    TasksCompleted: string[];
    WelcomeMessage: string;
    ChatMessage: string;
    ActivePrompt: string;
    TaskStatus: TaskStatus;
    CurrentActiveTask: string;
    SessionVariables: SessionVariables;
    Log: string[];

  }