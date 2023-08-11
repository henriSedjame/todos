import {TodoState} from "../index";
import {FilterOption} from "../../models/view/filter-option";

export interface ChangeFilterProps {
  all: boolean;
}

export function changeFilter(state: TodoState, props: ChangeFilterProps): TodoState {
  return {
    ...state,
    selectedFilter: props.all ? FilterOption.All : FilterOption.Completed
  };
}
