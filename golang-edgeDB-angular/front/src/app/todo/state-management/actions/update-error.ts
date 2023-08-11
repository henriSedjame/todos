import {TodoState} from "../index";

export enum FailureStep{
  GET_ALL,
  CREATE,
  UPDATE_LABEL,
  UPDATE_COMPLETED,
  DELETE
}

export interface FailureProps {
  error: string
  step: FailureStep
}

export function addError(state: TodoState, props: FailureProps): TodoState {
  switch (props.step) {
    case FailureStep.UPDATE_LABEL:
      return {
        ...state,
        editingTodo: null,
        error: props.error
      }
      case FailureStep.CREATE:
        return {
          ...state,
          newTodoLabelEditing: false,
          error: props.error
        }
        default:
          return {
            ...state,
            error: props.error
          }
  }
}

export function clearError(state: TodoState): TodoState {

  return {
    ...state,
    error: null
  };
}
