import {TodoState} from "../index";
import {Todo} from "../../models/dtos";

export interface EditingNewTodoProps {
  editing: boolean;
}

export interface CreateTodoRequestProps {
  label: string;
}

export interface TodoCreatedProps {
  todo: Todo
}


export function editingNewTodo(
  state: TodoState,
  props: EditingNewTodoProps
): TodoState {
  return {
    ...state,
    newTodoLabelEditing: props.editing
  };
}

export function todoCreated(
  state: TodoState,
  props: TodoCreatedProps
): TodoState {
  return {
    ...state,
    newTodoLabelEditing: false,
    todos: [
      ...state.todos,
      props.todo
    ],
  };
}
