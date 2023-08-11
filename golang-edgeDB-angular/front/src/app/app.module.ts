import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TodoModule} from "./todo/todo.module";
import {appReducers} from "./app.reducer";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TodoModule,
    BrowserModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
