import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoSelectComponent } from './todo-select/todo-select.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingMessageComponent } from './loading-message/loading-message.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoSelectComponent,
    LoadingSpinnerComponent,
    LoadingMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
