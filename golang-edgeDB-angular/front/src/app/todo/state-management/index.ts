import {Todo} from "../models/dtos";
import {FilterOption} from "../models/view/filter-option";


export interface TodoState {
  todos: Todo[];
  editingTodo: Todo | null;
  newTodoLabelEditing: boolean;
  selectedFilter: FilterOption;
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  editingTodo: null,
  newTodoLabelEditing: false,
  selectedFilter: FilterOption.All,
  error: null
}
