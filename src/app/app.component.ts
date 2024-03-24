import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import TodoCheckboxUpdate from './models/todo-checkbox-update.model';
import TodoTextUpdate from './models/todo-text-update.model';
import Todo from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  filterValue = "0"; // two-way binding

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoLoadHandler();
  }

  get filteredTodos() {
    const filterOptions = [
      (todo: Todo) => todo,
      (todo: Todo) => todo.isComplete === true,
      (todo: Todo) => todo.isComplete === false,
    ];
    return this.todoService.todos
      .filter(filterOptions[+this.filterValue]);
  }

  get noLoadingError() {
    return !this.todoService.todosAreLoading &&
      !this.todoService.errorData.isLoadingError;
  }

  get isLoadingTodos() {
    return this.todoService.todosAreLoading;
  }

  get errorState() {
    return {
      isLoadingError: this.todoService.errorData.isLoadingError,
      errorStatusCode: this.todoService.errorData.errorStatusCode,
      errorStatusText: this.todoService.errorData.errorStatusText,
      errorMessage: this.todoService.errorData.errorMessage
    };
  }

  todoLoadHandler() {
    this.todoService.getTodos();
  }

  todoCreateHandler(textData: string) {
    this.todoService.createTodo(textData);
  }

  todoDeleteHandler(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }

  todoUpdateHandler(data: TodoCheckboxUpdate | TodoTextUpdate) {
    this.todoService.updateTodo(data);
  }
}
