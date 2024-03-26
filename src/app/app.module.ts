import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { TodoSelectComponent } from './components/todo-select/todo-select.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingMessageComponent } from './components/loading-message/loading-message.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { InCorrectInputDirective } from './directives/incorrect-input.directive';
import { ImportanceDirective } from './directives/importance.directive';
import { TodoSortComponent } from './components/todo-sort/todo-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoSelectComponent,
    LoadingSpinnerComponent,
    LoadingMessageComponent,
    AutofocusDirective,
    InCorrectInputDirective,
    ImportanceDirective,
    TodoSortComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
