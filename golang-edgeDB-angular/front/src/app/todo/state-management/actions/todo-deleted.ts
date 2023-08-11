
import {TodoState} from "../index";

export interface DeleteTodoRequestProps{
  id: string
}

export interface TodoDeletedProps {
  id: string
}

export function todoDeleted(state:TodoState, props:TodoDeletedProps):TodoState {
  return {
    ...state,
    todos: state.todos.filter(todo => todo.id !== props.id)
  }
}
