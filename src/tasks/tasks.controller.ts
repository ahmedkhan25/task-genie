import { Controller, Get, Param, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './tasks.service'; 
import { Task } from './tasks.interface';  

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':name')
  getTask(@Param('name') name: string): Promise<Task | undefined> {
    return this.taskService.getTask(name);
  }

  @Post()
  addTask(@Body() task: Task): Promise<void> {
    return this.taskService.addTask(task);
  }

  @Post(':name/execute')
  async executeTask(@Param('name') name: string): Promise<void> {
    try {
      await this.taskService.executeTask(name);
    } catch (error) {
      throw new HttpException('Task execution failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}