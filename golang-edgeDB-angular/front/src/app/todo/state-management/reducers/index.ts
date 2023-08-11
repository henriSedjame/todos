import {createFeature, createReducer, on} from "@ngrx/store";
import {initialState} from "../index";
import {todoActions} from "../actions";
import {updateTodoCompleted} from "../actions/todo-completed";
import {editTodo, updateTodoLabel} from "../actions/edit-todo";
import {deleteTodo} from "../actions/delete-todo";


export const TODO_FEATURE_KEY = 'todos';

export const todoReducer = createReducer(
  initialState,
  on(todoActions.todoCompleted,   (state, props) => updateTodoCompleted(state, props)),
  on(todoActions.editTodo,       (state, props) => editTodo(state, props)),
  on(todoActions.todoUpdated,     (state, props) => updateTodoLabel(state, props)),
  on(todoActions.todoDeleted,       (state, props) => deleteTodo(state, props)),
);


export const todoFeature = createFeature({
  name: TODO_FEATURE_KEY,
  reducer: todoReducer
})
