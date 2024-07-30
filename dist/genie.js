"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genie = void 0;
const genie_interface_1 = require("./genie.interface");
exports.genie = {
    SessionID: '',
    LLM_API_Key: process.env.OpenAI_API_KEY || '',
    TasksCompleted: [],
    WelcomeMessage: 'Welcome to Task Genie',
    ChatMessage: '',
    ActivePrompt: '',
    TaskStatus: genie_interface_1.TaskStatus.NotStarted,
    CurrentActiveTask: '',
    SessionVariables: {},
    Log: [],
};
//# sourceMappingURL=genie.js.map