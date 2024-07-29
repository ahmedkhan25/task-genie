import { TaskService, Task } from './tasks.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Promise<Task[]>;
    getTask(name: string): Promise<Task | undefined>;
    addTask(task: Task): Promise<void>;
}
