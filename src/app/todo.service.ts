import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import TodoCheckboxUpdate from './models/todo-checkbox-update.model';
import TodoTextUpdate from './models/todo-text-update.model';
import Todo from './models/todo.model';
import ErrorData from './models/error-data.model';
import TodoPriorityUpdate from './models/todo-priority-update.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  todosAreLoading = false;
  todoOrder: string[] = [];
  errorData = new ErrorData();

  baseUrl = 'http://127.0.0.1:3000';
  minTodoTextLength = 2;
  maxTodoTextLength = 50;

  constructor(private http: HttpClient) {}

  sortTodos(val: number) {
    if (val === 0) {
      this.getTodos();
      this.todoOrder = [];
    }
    if (val === 1) {
      this.todos = this.todos
        .sort((a, b) => b.priority - a.priority);

      this.todoOrder = this.todos.map(todo => todo.id);
    }
    if (val === 2) {
      this.todos = this.todos
        .sort((a, b) => a.priority - b.priority);

      this.todoOrder = this.todos.map(todo => todo.id);
    }
  }

  getTodos() {
    this.todosAreLoading = true;
    return this.http
      .get<Todo[]>(`${this.baseUrl}/todos`).subscribe((data: Todo[]) => {
        this.todos = data;
        if (this.todoOrder.length > 0) {
          this.todos = this.todoOrder.map(idString => {
            const todo = this.todos.find(todo => todo.id === idString)!;
            return {
              id: todo.id,
              text: todo.text,
              priority: todo.priority,
              isComplete: todo.isComplete,
            }
          })
        }
        this.todosAreLoading = false;
        this.errorData = new ErrorData(false, null, null, null);
      },
      (error: HttpErrorResponse) => this.errorHandler(error))
  }

  createTodo(str: string) {
    const todo = new Todo(str);

    return this.http
      .post<Todo>(`${this.baseUrl}/todos`, todo).subscribe(
        () => {
          if (this.todoOrder.length > 0) {
            this.todoOrder.push(todo.id);
          }
          this.getTodos();
        },
        (error: HttpErrorResponse) => this.errorHandler(error)
      )
  }

  deleteTodo(id: string) {
    return this.http
      .delete<Todo>(`${this.baseUrl}/todos/${id}`).subscribe(
        () => {
          if (this.todoOrder.length > 0) {
            const index = this.todoOrder.findIndex(str => str === id);
            this.todoOrder.splice(index, 1);
          }
          this.getTodos();
        },
        (error: HttpErrorResponse) => this.errorHandler(error)
      )
  }

  updateTodo(data: TodoCheckboxUpdate | TodoTextUpdate | TodoPriorityUpdate) {
    const options: any = {};

    if (data instanceof TodoCheckboxUpdate) {
      options.isComplete = !data.oldCheckboxValue;
    }
    if (data instanceof TodoTextUpdate) {
      options.text = data.newText;
    }
    if (data instanceof TodoPriorityUpdate) {
      options.priority = data.priority;
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
