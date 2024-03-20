import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TodoCheckboxUpdate from '../models/TodoCheckboxUpdate';
import Todo from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'http://127.0.0.1:3000';
  minTodoTextLength = 2;
  maxTodoTextLength = 50;

  constructor(private http: HttpClient) {}

  addTodo(str: string) {
    return this.http
      .post<Todo>(`${this.baseUrl}/todos`, new Todo(str))
  }

  updateTodo(data: TodoCheckboxUpdate) {
    return this.http
      .patch<Todo>(`${this.baseUrl}/todos/${data.todoId}`, { isComplete: !data.oldCheckboxValue });
  }

  deleteTodo(id: string) {
    return this.http
      .delete<Todo>(`${this.baseUrl}/todos/${id}`);
  }

  getTodos() {
    return this.http
      .get<Todo[]>(`${this.baseUrl}/todos`)
  }
}
