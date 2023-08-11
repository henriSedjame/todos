import {Component, Input} from '@angular/core';

import { Store } from "@ngrx/store";
import {Todo} from "../../models/dtos";
import {ButtonIcon} from "../../models/view/buton-icon";
import {AppState} from "../../../app.reducer";
import {todoActions} from "../../state-management/actions";

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent {

  @Input()
  todo!: Todo;

  @Input()
  editable!: boolean;

  @Input()
  isEditing!: boolean;

  buttonActive = true;

  icons = ButtonIcon;


  constructor(private store: Store<AppState>) {}

  onCheck() {
    this.store.dispatch(todoActions.todoCompleted({
      id: this.todo.id,
      completed: !this.todo.completed
    }));
  }

  onEdit() {
    this.store.dispatch(todoActions.editTodo({
      id: this.todo.id,
      label: this.todo.label
    }));
  }

  onDelete() {
    this.store.dispatch(todoActions.todoDeleted({
      id: this.todo.id
    }));
  }

}
