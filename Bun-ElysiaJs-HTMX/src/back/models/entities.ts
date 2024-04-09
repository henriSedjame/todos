import {TodoDto} from "./dtos";

export interface TodoEntity {
    id: string;
    label: string;
    completed: boolean;
}

export const createTodoEntity = (label: string): TodoEntity => {
    return {
        id: crypto.randomUUID(),
        label,
        completed: false
    }
}