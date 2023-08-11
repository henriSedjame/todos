
import {TodoState} from "../index";

export interface CompleteTodoProps{
  id: string,
  completed: boolean
}

export function updateTodoCompleted(state: TodoState, props: CompleteTodoProps): TodoState {
  return {
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === props.id) {
        return {
          ...todo,
          completed: props.completed
        }
      }
      return todo;
    })
  }
}
