import {Component, computed} from '@angular/core';
import {FilterOption} from "../../models/view/filter-option";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../app.reducer";
import {toSignal} from "@angular/core/rxjs-interop";
import {todoFeature} from "../../state-management/reducers";
import {todoActions} from "../../state-management/actions";


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {


  selectedOption = toSignal(this.store.pipe(
    select(todoFeature.selectSelectedFilter)
  ));

  viewAll = computed(() => this.selectedOption() == FilterOption.All)

  constructor(private store: Store<AppState>) {}

  select(all: boolean) {
    this.store.dispatch(todoActions.changeFilter({ all }))
  }
}
