
import {TodoState} from "../index";
import {Todo} from "../../models/dtos";

export interface EditTodoLabelProps {
  id: string
}

export interface UpdateTodoLabelRequestProps {
  id: string,
  label: string,
  completed: boolean
}

export interface TodoLabelUpdatedProps{
  todo: Todo
}



export function editTodoLabel(state: TodoState, props: EditTodoLabelProps): TodoState {
  return {
    ...state,
    newTodoLabelEditing: false,
    editingTodo: state.todos.find(todo => todo.id === props.id) || null
  }
}

export function todoLabelUpdated(state: TodoState, props: TodoLabelUpdatedProps): TodoState {
  return {
    ...state,
    editingTodo: null,
    todos: state.todos.map(todo => {
      if (todo.id === props.todo.id) {
        return {
          ...todo,
          label: props.todo.label
        }
      }
      return todo;
    })
  }
}
