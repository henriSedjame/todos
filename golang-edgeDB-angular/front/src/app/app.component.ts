import {Component, effect, OnInit} from '@angular/core';

import {select, Store} from "@ngrx/store";
import {toSignal} from "@angular/core/rxjs-interop";
import {AppState} from "./app.reducer";
import {todoFeature} from "./todo/state-management/reducers";
import {todoActions} from "./todo/state-management/actions";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos = toSignal(this.store.pipe(
    select(todoFeature.selectFilteredTodos)
  ));

  error = toSignal(this.store.pipe(
    select(todoFeature.selectError)
  ))

  constructor(private store: Store<AppState>) {
    effect(() => {
      if (this.error() != null) {
        setTimeout(() => {
          this.store.dispatch(todoActions.clearError());
        }, 3000)
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(todoActions.loadTodosRequest());
  }

}
