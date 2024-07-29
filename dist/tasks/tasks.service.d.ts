export interface Task {
    name: string;
    description: string;
    code: string;
}
export declare class TaskService {
    private tasksFilePath;
    getAllTasks(): Promise<Task[]>;
    getTask(name: string): Promise<Task | undefined>;
    addTask(task: Task): Promise<void>;
    private readTasksFromFile;
    private writeTasksToFile;
    private writeTaskFiles;
}
