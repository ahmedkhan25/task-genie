import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TaskService, Task } from './tasks.service';  // Import the Task interface

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {  // Ensure the return type is correctly annotated
    return this.taskService.getAllTasks();
  }

  @Get(':name')
  getTask(@Param('name') name: string): Promise<Task | undefined> {  // Ensure the return type is correctly annotated
    return this.taskService.getTask(name);
  }

  @Post()
  addTask(@Body() task: Task): Promise<void> {  // Ensure the parameter and return types are correctly annotated
    return this.taskService.addTask(task);
  }
}