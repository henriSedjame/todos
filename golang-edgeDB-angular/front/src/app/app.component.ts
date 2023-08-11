import {Component, computed, effect, signal, WritableSignal} from '@angular/core';

import {select, Store} from "@ngrx/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {FilterOption} from "./todo/models/view/filter-option";
import {AppState} from "./app.reducer";
import {todoFeature} from "./todo/state-management/reducers";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  labelSignal: WritableSignal<string| undefined > = signal(undefined);

  selectedOptionSignal: WritableSignal<FilterOption> = signal(FilterOption.All);

  todos = toSignal(this.store.pipe(
    select(todoFeature.selectTodos)
  ));

  editingTodo = toSignal(this.store.pipe(
    select(todoFeature.selectEditingTodo)
  ));

  hasEditingTodo = computed(() => this.editingTodo() != null);

  constructor(private store: Store<AppState>) {
    effect(() => {
       if (this.labelSignal() != undefined) {
         console.log("labelSignal: " + this.labelSignal())
       }
    })
  }

}
