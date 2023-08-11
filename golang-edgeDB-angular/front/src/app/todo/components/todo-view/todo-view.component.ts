import {Component, computed, Input} from '@angular/core';

import {select, Store} from "@ngrx/store";
import {Todo} from "../../models/dtos";
import {ButtonIcon} from "../../models/view/buton-icon";
import {AppState} from "../../../app.reducer";
import {todoActions} from "../../state-management/actions";
import {toSignal} from "@angular/core/rxjs-interop";
import {todoFeature} from "../../state-management/reducers";

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent {

  @Input()
  todo!: Todo;

  buttonActive = true;

  icons = ButtonIcon;

  editingTodo= toSignal(this.store.pipe(
    select(todoFeature.selectEditingTodo)
  ));

  hasEditingTodo = toSignal(this.store.pipe(
    select(todoFeature.selectUpdatingTodo),
  ));

  isEditing = computed(() => this.editingTodo()?.id == this.todo.id);

  labelToShow = computed(() => this.isEditing() ? "....." : this.todo.label);

  editable = computed(() => !this.hasEditingTodo());

  deletable = computed(() => !this.isEditing());

  constructor(private store: Store<AppState>) {}

  onCheck() {
    this.runOnce(() => {

      this.store.dispatch(todoActions.completeTodoRequest({
        id: this.todo.id,
        completed: !this.todo.completed,
        label: this.todo.label
      }));
    })
  }

  onEdit() {
    this.runOnce(() => {
      this.store.dispatch(todoActions.editTodoLabel({
        id: this.todo.id
      }));
    })
  }

  onDelete() {
    this.runOnce(() => {
      this.store.dispatch(todoActions.deleteTodoRequest({
        id: this.todo.id
      }));
    })
  }

  runOnce(f : () => void) {
    if (this.buttonActive) {
      f();
      this.buttonActive = false;
      setTimeout(() => this.buttonActive = true, 500);
    }
  }

}
