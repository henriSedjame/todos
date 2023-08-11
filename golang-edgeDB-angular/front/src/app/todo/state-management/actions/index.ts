import {createActionGroup, props} from "@ngrx/store";
import {CompleteTodoProps} from "./todo-completed";
import {EditTodoProps} from "./edit-todo";
import {DeleteTodoProps} from "./delete-todo";


export enum TodoActionTypes {
  TodoCompleted = 'Todo Completed',
  EditTodo = 'Edit Todo',
  TodoUpdated = 'Todo Updated',
  TodoDeleted = 'Todo Deleted',
}


export const todoActions = createActionGroup( {
  source: 'todos',
  events: {
    [TodoActionTypes.TodoCompleted]: props<CompleteTodoProps>(),
    [TodoActionTypes.EditTodo]: props<EditTodoProps>(),
    [TodoActionTypes.TodoUpdated]: props<EditTodoProps>(),
    [TodoActionTypes.TodoDeleted]: props<DeleteTodoProps>(),
  }
})
