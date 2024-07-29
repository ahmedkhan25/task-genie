import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

export interface Task {  // Export the Task interface
  name: string;
  description: string;
  code: string;
}

@Injectable()
export class TaskService {
  private tasksFilePath = path.join(__dirname, '../../TaskLibrary/tasks.json');

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.readTasksFromFile();
    return tasks;
  }

  async getTask(name: string): Promise<Task | undefined> {
    const tasks = await this.readTasksFromFile();
    return tasks.find(task => task.name === name);
  }

  async addTask(task: Task): Promise<void> {
    const tasks = await this.readTasksFromFile();
    tasks.push(task);
    await this.writeTasksToFile(tasks);
    await this.writeTaskFiles(task);
  }

  private async readTasksFromFile(): Promise<Task[]> {
    const data = await fs.readFile(this.tasksFilePath, 'utf8');
    return JSON.parse(data);
  }

  private async writeTasksToFile(tasks: Task[]): Promise<void> {
    await fs.writeFile(this.tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
  }

  private async writeTaskFiles(task: Task): Promise<void> {
    const taskTsPath = path.join(__dirname, `../../TaskLibrary/${task.name}.ts`);
    const taskTxtPath = path.join(__dirname, `../../TaskLibrary/${task.name}.txt`);

    await fs.writeFile(taskTsPath, task.code, 'utf8');
    await fs.writeFile(taskTxtPath, task.description, 'utf8');
  }
}