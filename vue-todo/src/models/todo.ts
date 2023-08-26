export enum TodoStatus {
    open,
    closed
}

export interface Todo {
    id: number,
    title: string;
    userId: number;
    completed: boolean;
}