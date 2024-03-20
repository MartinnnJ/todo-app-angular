import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TodoCheckboxUpdate from '../models/TodoCheckboxUpdate';
import TodoTextUpdate from '../models/TodoTextUpdate';
import Todo from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'http://127.0.0.1:3000';
  minTodoTextLength = 2;
  maxTodoTextLength = 50;

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http
      .get<Todo[]>(`${this.baseUrl}/todos`)
  }

  addTodo(str: string) {
    return this.http
      .post<Todo>(`${this.baseUrl}/todos`, new Todo(str))
  }

  deleteTodo(id: string) {
    return this.http
      .delete<Todo>(`${this.baseUrl}/todos/${id}`);
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
      .patch<Todo>(`${this.baseUrl}/todos/${data.todoId}`, options);
  }
}
