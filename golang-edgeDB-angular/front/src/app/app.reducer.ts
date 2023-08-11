import {createReducer} from "@ngrx/store";
import {todoReducer, TODO_FEATURE_KEY} from "./todo/state-management/reducers";
import {TodoState} from "./todo/state-management";

export interface AppState {
  [TODO_FEATURE_KEY] : TodoState
}
export const appReducers = createReducer({
  [TODO_FEATURE_KEY]: todoReducer
})
