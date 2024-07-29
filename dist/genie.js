"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genie = void 0;
const genie_interface_1 = require("./genie.interface");
const uuid_1 = require("uuid");
exports.genie = {
    SessionID: (0, uuid_1.v4)(),
    LLM_API_Key: process.env.OPEN_AI_API_KEY || '',
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