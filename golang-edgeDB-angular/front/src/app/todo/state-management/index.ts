import {Todo} from "../models/dtos";
import {FilterOption} from "../models/view/filter-option";


export interface EditingTodo {
  id: string;
  label: string;
}

export interface TodoState {
  todos: Todo[];
  editingTodo: EditingTodo | null;
  newTodoLabel: string | null;
  selectedFilter: FilterOption
}

export const initialState: TodoState = {
  todos: [
    {
      id: '1',
      label: 'Todo 1',
      completed: false
    },
    {
      id: '2',
      label: 'Todo 2',
      completed: false
    },
    {
      id: '3',
      label: 'Todo 3',
      completed: true
    }
  ],
  editingTodo: null,
  newTodoLabel: null,
  selectedFilter: FilterOption.All
}
