import {Component, computed, Input, WritableSignal} from '@angular/core';
import {FilterOption} from "../../models/view/filter-option";


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {

  @Input()
  selectedOptionSignal!: WritableSignal<FilterOption>;

  viewAll = computed(() => this.selectedOptionSignal() == FilterOption.All)

  select(all: boolean) {
    this.selectedOptionSignal.set(all ? FilterOption.All : FilterOption.Completed)
  }
}
