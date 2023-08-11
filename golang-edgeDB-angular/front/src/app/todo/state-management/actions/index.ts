import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {CompleteTodoRequestProps, TodoCompletedProps} from "./todo-completed";
import {EditTodoLabelProps, TodoLabelUpdatedProps, UpdateTodoLabelRequestProps} from "./edit-todo-label";
import {DeleteTodoRequestProps, TodoDeletedProps} from "./todo-deleted";
import {CreateTodoRequestProps, EditingNewTodoProps, TodoCreatedProps} from "./todo-created";
import {ChangeFilterProps} from "./change-filter";
import {TodosLoadedProps} from "./get-todos";
import {FailureProps} from "./update-error";




export enum TodoActionTypes {
  // Load Todos
  LoadTodosRequest = 'Load todos request',
  TodosLoaded = 'Todos Loaded',

  // Create _Todo
  EditingNewTodoLabel = 'Editing New Todo Label',

  CreateTodoRequest = 'Create Todo Request',
  TodoCreated = 'Todo Created',


  // Complete _Todo
  CompleteTodoRequest = 'Complete Todo Request',
  TodoCompleted = 'Todo Completed',

  // Update _Todo label
  EditTodoLabel = 'Edit Todo label',
  UpdateTodoLabelRequest = 'Update Todo label Request',
  TodoLabelUpdated = 'Todo Label Updated',


  DeleteTodoRequest = 'Delete Todo Request',
  TodoDeleted = 'Todo Deleted',

  FailureOccurred = 'FailureOccurred',

  ChangeFilter = 'Change Filter',

  clearError = 'Clear Error',
}


export const todoActions = createActionGroup( {
  source: 'todos',
  events: {
    [TodoActionTypes.LoadTodosRequest]: emptyProps(),
    [TodoActionTypes.TodosLoaded]: props<TodosLoadedProps>(),

    [TodoActionTypes.EditingNewTodoLabel]: props<EditingNewTodoProps>(),
    [TodoActionTypes.CreateTodoRequest]: props<CreateTodoRequestProps>(),
    [TodoActionTypes.TodoCreated]: props<TodoCreatedProps>(),


    [TodoActionTypes.CompleteTodoRequest]: props<CompleteTodoRequestProps>(),
    [TodoActionTypes.TodoCompleted]: props<TodoCompletedProps>(),

    [TodoActionTypes.EditTodoLabel]: props<EditTodoLabelProps>(),

    [TodoActionTypes.UpdateTodoLabelRequest]: props<UpdateTodoLabelRequestProps>(),
    [TodoActionTypes.TodoLabelUpdated]: props<TodoLabelUpdatedProps>(),

    [TodoActionTypes.DeleteTodoRequest]: props<DeleteTodoRequestProps>(),
    [TodoActionTypes.TodoDeleted]: props<TodoDeletedProps>(),

    [TodoActionTypes.FailureOccurred]: props<FailureProps>(),

    [TodoActionTypes.ChangeFilter]: props<ChangeFilterProps>(),

    [TodoActionTypes.clearError]: emptyProps(),
  }
})
