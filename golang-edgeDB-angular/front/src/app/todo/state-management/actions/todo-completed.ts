
import {TodoState} from "../index";
import {Todo} from "../../models/dtos";

export interface CompleteTodoRequestProps {
  id: string,
  completed: boolean
  label: string
}

export interface TodoCompletedProps {
  todo: Todo
}

export function todoCompleted(state: TodoState, props: TodoCompletedProps): TodoState {
  return {
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === props.todo.id) {
        return {
          ...todo,
          completed: props.todo.completed
        }
      }
      return todo;
    })
  }
}
