import { Task } from './tasks.interface';
export declare class TaskService {
    private tasksFilePath;
    constructor();
    getAllTasks(): Promise<Task[]>;
    getTask(name: string): Promise<Task | undefined>;
    addTask(task: Task): Promise<void>;
    executeTask(name: string): Promise<void>;
    private readTasksFromFile;
    private writeTasksToFile;
    private writeTaskFiles;
}
