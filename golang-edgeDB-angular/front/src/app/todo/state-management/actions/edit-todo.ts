
import {TodoState} from "../index";

export interface EditTodoProps{
  id: string,
  label: string
}


export function editTodo(state: TodoState, props: EditTodoProps): TodoState {
  return {
    ...state,
    editingTodo: {
      id: props.id,
      label: props.label,
    }
  }
}

export function updateTodoLabel(state: TodoState, props: EditTodoProps): TodoState {
  return {
    ...state,
    editingTodo: null,
    todos: state.todos.map(todo => {
      if (todo.id === props.id) {
        return {
          ...todo,
          label: props.label
        }
      }
      return todo;
    })
  }
}
