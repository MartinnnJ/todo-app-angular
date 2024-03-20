import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../todo.service';
import TodoCheckboxUpdate from '../../models/TodoCheckboxUpdate';
import TodoTextUpdate from '../../models/TodoTextUpdate';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css'
})
export class TodoListItemComponent implements OnInit {
  isEditing = false;
  inputEditText = '';
  incorrectInput = false;

  @Input() todoId!: string;
  @Input() todoText!: string;
  @Input() todoIsComplete!: boolean;

  @Output() deleteTodo = new EventEmitter<string>();
  @Output() updateTodo = new EventEmitter<TodoCheckboxUpdate | TodoTextUpdate>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.inputEditText = this.todoText;
  }

  get inputClasses() {
    return this.incorrectInput ? ['form-control', 'incorrect'] : ['form-control'];
  }

  get todoTextClasses() {
    return this.isComplete ? ['linethrough', 'text-muted'] : [];
  }

  get isComplete() {
    return this.todoIsComplete ? true : false;
  }

  get updateButtonOutputText() {
    return this.isEditing ? 'Save' : 'Edit';
  }

  inputChangeHandler(event: Event) {
    const el = event.target! as HTMLInputElement;
    this.inputEditText = el.value;
    this.incorrectInput = false;
  }

  checkboxChangeHandler(val: boolean, id: string) {
    this.updateTodo.emit(new TodoCheckboxUpdate(id, val));
  }

  updateButtonClickHandler(id: string) { // edit, save button handler
    this.isEditing = !this.isEditing;
    
    if (!this.isEditing) {
      if (
        this.inputEditText.length > this.todoService.minTodoTextLength &&
        this.inputEditText.length < this.todoService.maxTodoTextLength
      ) {
        this.updateTodo.emit(new TodoTextUpdate(id, this.inputEditText));
      } else {
        this.incorrectInput = true;
        this.isEditing = true;
      }
    }
  }

  deleteButtonClickHandler(id: string) {
    this.deleteTodo.emit(id);
  }

  cancelEditButtonClickHandler() {
    this.isEditing = false;
    this.incorrectInput = false;
    this.inputEditText = this.todoText;
  }
}
