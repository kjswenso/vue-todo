import { ApiMethod, Todo } from "@/models/models";
const TODOS_RESOURCE = "https://jsonplaceholder.typicode.com/todos"

export function getAllTodos(): Promise<Array<Todo>> {
    return fetch(TODOS_RESOURCE)
    .then((response) => response.json())
}

export function getAllUsers(): Promise<Array<number>> {
    return fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => users.map(user => user.id))
}

export function addOrUpdateTodo(todo: Todo, method: ApiMethod) {
    const url = method === 'PATCH' ? `${TODOS_RESOURCE}/${todo.id}` : TODOS_RESOURCE;
    return fetch(TODOS_RESOURCE, {
        method,
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    }).then(response => response.json());
}