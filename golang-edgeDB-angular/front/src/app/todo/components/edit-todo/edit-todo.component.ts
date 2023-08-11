import {Component, effect, OnInit} from '@angular/core';
import {ButtonIcon} from "../../models/view/buton-icon";
import {FormControl, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {toSignal} from "@angular/core/rxjs-interop";

import {AppState} from "../../../app.reducer";
import {todoFeature} from "../../state-management/reducers";
import {todoActions} from "../../state-management/actions";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  addBtnLabel = ButtonIcon.Add;

  editingTodo= toSignal(this.store.pipe(
    select(todoFeature.selectEditingTodo)
  ));

  hasEditingTodo = toSignal(this.store.pipe(
    select(todoFeature.selectUpdatingTodo),
  ));

  isNewLabelEditing = toSignal(this.store.pipe(
    select(todoFeature.selectNewTodoLabelEditing),
  ))

  labelControl = new FormControl<string>('', Validators.compose([
    Validators.required,
    Validators.minLength(3),
  ]));

  constructor(private store: Store<AppState>) {
    effect(() => {
      if (this.hasEditingTodo()) {
        this.labelControl.setValue(this.editingTodo()!.label);
      }
    })
  }

  ngOnInit(): void {
    this.labelControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe((value) => {
      if (!this.hasEditingTodo()) {
        let valueNotEmpty = value != null && value.length > 0;
        if (valueNotEmpty != this.isNewLabelEditing()) {
          this.store.dispatch(todoActions.editingNewTodoLabel({
            editing: valueNotEmpty
          }))
        }

      }
    });
  }

  addTask() {
    if (this.labelControl.value != null) {
      if (this.isNewLabelEditing()) {
        this.store.dispatch(todoActions.createTodoRequest({
          label: this.labelControl.value
        }));
        this.labelControl.reset();
      }
    }
  }

  editTask() {
    if (this.labelControl.value != null) {
      this.store.dispatch(todoActions.updateTodoLabelRequest({
        id: this.editingTodo()!.id,
        label: this.labelControl.value,
        completed: this.editingTodo()!.completed
      }));
      this.labelControl.reset();
    }
  }
}
