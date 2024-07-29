import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as tsNode from 'ts-node';
import { Task } from './tasks.interface';  // Assuming you have a Task interface

@Injectable()
export class TaskService {
  private tasksFilePath = path.join(__dirname, '../../TaskLibrary/tasks.json');

  constructor() {
    tsNode.register({
      transpileOnly: true,
      compilerOptions: {
        module: 'commonjs'
      }
    });
  }

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

  async executeTask(name: string): Promise<void> {
    console.log('trying task :', name);
    try {
      const taskPath = path.join(__dirname, `../../TaskLibrary/${name}.ts`);
      const { exampleTask } = await import(taskPath);
      exampleTask();
    } catch (error) {
      // Handle the error here
      console.error('Error executing imported task:', error);
    }
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