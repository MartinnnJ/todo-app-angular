import { Component, EventEmitter, Input, Output } from '@angular/core';
import TodoCheckboxUpdate from '../../models/TodoCheckboxUpdate';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css'
})
export class TodoListItemComponent {
  @Input() todoId!: string;
  @Input() todoText!: string;
  @Input() todoIsComplete!: boolean;

  @Output() deleteTodo = new EventEmitter<string>();
  @Output() updateTodo = new EventEmitter<TodoCheckboxUpdate>();

  get isComplete() {
    return this.todoIsComplete ? true : false;
  }

  get cssClasses() {
    return this.isComplete ? ['linethrough', 'text-muted'] : [];
  }

  checkboxChangeHandler(val: boolean, id: string) {
    this.updateTodo.emit(new TodoCheckboxUpdate(id, val));
  }

  buttonClickHandler(id: string) {
    this.deleteTodo.emit(id);
  }
}
