import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import TodoCheckboxUpdate from '../models/TodoCheckboxUpdate';
import ErrorData from '../models/ErrorData';
import Todo from '../models/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoading = false;
  errorData = new ErrorData();
  todos: Todo[] = [];
  todoFilterValue = "0"; // two-way binding

  constructor(private todoService: TodoService) {}

  get filteredTodos() {
    const filterOptions = [
      (todo: Todo) => todo,
      (todo: Todo) => todo.isComplete === true,
      (todo: Todo) => todo.isComplete === false,
    ];

    return this.todos.filter(filterOptions[+this.todoFilterValue]);
  }

  errorHandler(error: HttpErrorResponse) {
    if (!error.ok) {
      this.isLoading = false;
      this.errorData = new ErrorData(true, error.status, error.statusText, error.message);
    }
  }

  getAllTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
      this.isLoading = false;
      this.errorData = new ErrorData(false, null, null, null);
    },
    (error: HttpErrorResponse) => this.errorHandler(error))
  }

  todoSubmitHandler(textData: string) {
    this.todoService.addTodo(textData).subscribe((data: Todo) => {
      this.getAllTodos();
      console.log(data);
    },
    (error: HttpErrorResponse) => this.errorHandler(error))
  }

  todoUpdateHandler(data: TodoCheckboxUpdate) {
    this.todoService.updateTodo(data).subscribe((data: Todo) => {
      this.getAllTodos();
      console.log(data);
    },
    (error: HttpErrorResponse) => this.errorHandler(error))
  }

  todoDeleteHandler(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe((data: Todo) => {
      this.getAllTodos();
      console.log(data);
    },
    (error: HttpErrorResponse) => this.errorHandler(error))
  }

  ngOnInit(): void {
    this.getAllTodos();
  }
}
