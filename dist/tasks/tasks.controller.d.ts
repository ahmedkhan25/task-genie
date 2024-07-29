import { TaskService } from './tasks.service';
import { Task } from './tasks.interface';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Promise<Task[]>;
    getTask(name: string): Promise<Task | undefined>;
    addTask(task: Task): Promise<void>;
    executeTask(name: string): Promise<void>;
}
