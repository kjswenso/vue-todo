import { Todo } from "@/models/todo";

export function getAllTodos(): Promise<Array<Todo>> {
    return fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
}