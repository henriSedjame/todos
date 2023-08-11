import {createFeature, createReducer, createSelector, on} from "@ngrx/store";
import {initialState} from "../index";
import {todoActions} from "../actions";
import {todoCompleted} from "../actions/todo-completed";
import {editTodoLabel, todoLabelUpdated} from "../actions/edit-todo-label";
import {todoDeleted} from "../actions/todo-deleted";
import {todoCreated, editingNewTodo} from "../actions/todo-created";
import {changeFilter} from "../actions/change-filter";
import {FilterOption} from "../../models/view/filter-option";
import {loadTodos} from "../actions/get-todos";
import {addError, clearError} from "../actions/update-error";


export const TODO_FEATURE_KEY = 'todos';

export const todoReducer = createReducer(
  initialState,

  on(todoActions.todosLoaded, (state, props) => loadTodos(state, props)),

  on(todoActions.editingNewTodoLabel, (state, props) => editingNewTodo(state, props)),
  on(todoActions.todoCreated, (state, props) => todoCreated(state, props)),


  on(todoActions.todoCompleted, (state, props) => todoCompleted(state, props)),

  on(todoActions.editTodoLabel, (state, props) => editTodoLabel(state, props)),
  on(todoActions.todoLabelUpdated, (state, props) => todoLabelUpdated(state, props)),

  on(todoActions.todoDeleted, (state, props) => todoDeleted(state, props)),

  on(todoActions.failureOccurred, (state, props) => addError(state, props)),

  on(todoActions.changeFilter, (state, props) => changeFilter(state, props)),

  on(todoActions.clearError, (state, _) => clearError(state)),
);


export const todoFeature = createFeature({
  name: TODO_FEATURE_KEY,
  reducer: todoReducer,
  extraSelectors: ({selectTodos, selectEditingTodo, selectSelectedFilter}) => ({
    selectUpdatingTodo: createSelector(selectEditingTodo, (todo) => todo != null),
    selectFilteredTodos: createSelector(selectTodos, selectSelectedFilter, (todos, filter) => {
      switch (filter) {
        case FilterOption.All:
          return todos;
        case FilterOption.Completed:
          return todos.filter(todo => todo.completed);
      }
    })
  }),
})
