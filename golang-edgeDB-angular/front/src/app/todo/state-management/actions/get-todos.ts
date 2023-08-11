import {Todo} from "../../models/dtos";
import {TodoState} from "../index";

export interface TodosLoadedProps{
    todos: Todo[];
}

export function loadTodos(state: TodoState, props: TodosLoadedProps): TodoState {
    return {
        ...state,
        todos: props.todos
    }
}
