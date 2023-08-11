import {Component, computed, effect, Input, WritableSignal} from '@angular/core';
import {ButtonIcon} from "../../models/view/buton-icon";
import {FormControl, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {toSignal} from "@angular/core/rxjs-interop";

import {AppState} from "../../../app.reducer";
import {todoFeature} from "../../state-management/reducers";
import {todoActions} from "../../state-management/actions";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent  {

  @Input()
  labelSignal!: WritableSignal<string| undefined>;


  addBtnLabel = ButtonIcon.Add;

  editingTodo= toSignal(this.store.pipe(
    select(todoFeature.selectEditingTodo)
  ));

  hasEditingTodo = computed(() => this.editingTodo() != null && this.editingTodo() != undefined);

  labelControl = new FormControl<string>('', Validators.compose([
    Validators.required,
    Validators.minLength(3),
  ]));

  constructor(private store: Store<AppState>) {

    effect(() => {
      if (this.editingTodo() != null) {
        this.labelControl.setValue(this.editingTodo()!.label);
      }
    })
  }


  addTask() {
    if (this.labelControl.value != null) {
        this.labelSignal.set(this.labelControl.value);
        this.labelControl.reset();
    }
  }

  editTask() {
    if (this.labelControl.value != null) {
      this.store.dispatch(todoActions.todoUpdated({
        id: this.editingTodo()!.id,
        label: this.labelControl.value
      }));
      this.labelControl.reset();

    }
  }
}
