import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import TodoCheckboxUpdate from './models/todo-checkbox-update.model';
import TodoTextUpdate from './models/todo-text-update.model';
import Todo from './models/todo.model';
import ErrorData from './models/error-data.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  todosAreLoading = false;
  errorData = new ErrorData();

  baseUrl = 'http://127.0.0.1:3000';
  minTodoTextLength = 2;
  maxTodoTextLength = 50;

  constructor(private http: HttpClient) {}

  getTodos() {
    this.todosAreLoading = true;
    return this.http
      .get<Todo[]>(`${this.baseUrl}/todos`).subscribe((data: Todo[]) => {
        this.todos = data;
        this.todosAreLoading = false;
        this.errorData = new ErrorData(false, null, null, null);
      },
      (error: HttpErrorResponse) => this.errorHandler(error))
  }

  createTodo(str: string) {
    return this.http
      .post<Todo>(`${this.baseUrl}/todos`, new Todo(str)).subscribe(
        () => this.getTodos(),
        (error: HttpErrorResponse) => this.errorHandler(error)
      )
  }

  deleteTodo(id: string) {
    return this.http
      .delete<Todo>(`${this.baseUrl}/todos/${id}`).subscribe(
        () => this.getTodos(),
        (error: HttpErrorResponse) => this.errorHandler(error)
      )
  }

  updateTodo(data: TodoCheckboxUpdate | TodoTextUpdate) {
    const options: any = {};

    if (data instanceof TodoCheckboxUpdate) {
      options.isComplete = !data.oldCheckboxValue;
    }
    if (data instanceof TodoTextUpdate) {
      options.text = data.newText;
    }

    return this.http
      .patch<Todo>(`${this.baseUrl}/todos/${data.todoId}`, options).subscribe(
        () => this.getTodos(),
        (error: HttpErrorResponse) => this.errorHandler(error)
      )
  }

  errorHandler(error: HttpErrorResponse) {
    if (!error.ok) {
      this.todosAreLoading = false;
      this.errorData = new ErrorData(true, error.status, error.statusText, error.message);
    }
  }
}
