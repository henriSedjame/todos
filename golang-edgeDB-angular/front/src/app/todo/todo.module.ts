import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {todoFeature} from "./state-management/reducers";
import {ButtonComponent} from "./components/button/button.component";
import {EditTodoComponent} from "./components/edit-todo/edit-todo.component";
import {FilterBarComponent} from "./components/filter-bar/filter-bar.component";
import {TodoViewComponent} from "./components/todo-view/todo-view.component";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {TodoEffects} from "./todo.effects";


@NgModule({
  declarations: [
    ButtonComponent,
    EditTodoComponent,
    FilterBarComponent,
    TodoViewComponent
  ],
  exports: [
    TodoViewComponent,
    FilterBarComponent,
    EditTodoComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(todoFeature),
    EffectsModule.forFeature([TodoEffects]),
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TodoModule { }
