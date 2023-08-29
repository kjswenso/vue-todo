export type TodoAction = 'Add' | 'Edit';
export type ApiMethod = 'POST' | 'PATCH';

export interface Todo {
    id: number,
    title: string;
    userId: number;
    completed: boolean;
}

export interface UpdateTodoEvent {
    todo: Partial<Todo>;
    method: ApiMethod;
}