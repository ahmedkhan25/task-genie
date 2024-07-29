"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
let TaskService = class TaskService {
    constructor() {
        this.tasksFilePath = path.join(__dirname, '../../TaskLibrary/tasks.json');
    }
    async getAllTasks() {
        const tasks = await this.readTasksFromFile();
        return tasks;
    }
    async getTask(name) {
        const tasks = await this.readTasksFromFile();
        return tasks.find(task => task.name === name);
    }
    async addTask(task) {
        const tasks = await this.readTasksFromFile();
        tasks.push(task);
        await this.writeTasksToFile(tasks);
        await this.writeTaskFiles(task);
    }
    async readTasksFromFile() {
        const data = await fs_1.promises.readFile(this.tasksFilePath, 'utf8');
        return JSON.parse(data);
    }
    async writeTasksToFile(tasks) {
        await fs_1.promises.writeFile(this.tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
    }
    async writeTaskFiles(task) {
        const taskTsPath = path.join(__dirname, `../../TaskLibrary/${task.name}.ts`);
        const taskTxtPath = path.join(__dirname, `../../TaskLibrary/${task.name}.txt`);
        await fs_1.promises.writeFile(taskTsPath, task.code, 'utf8');
        await fs_1.promises.writeFile(taskTxtPath, task.description, 'utf8');
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)()
], TaskService);
//# sourceMappingURL=tasks.service.js.map