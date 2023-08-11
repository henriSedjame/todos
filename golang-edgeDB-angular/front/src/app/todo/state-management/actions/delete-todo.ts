
import {TodoState} from "../index";

export interface DeleteTodoProps{
  id: string
}

export function deleteTodo(state:TodoState, props:DeleteTodoProps):TodoState {
  return {
    ...state,
    todos: state.todos.filter(todo => todo.id !== props.id)
  }
}
