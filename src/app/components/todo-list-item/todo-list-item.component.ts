import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../../todo.service';
import TodoCheckboxUpdate from '../../models/todo-checkbox-update.model';
import TodoTextUpdate from '../../models/todo-text-update.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css'
})
export class TodoListItemComponent implements OnInit {
  isEditing = false;
  inCorrectFormSubmit = false; // two-way binding
  inputEditText = ''; // two-way binding

  @Input() todoId!: string;
  @Input() todoText!: string;
  @Input() todoIsComplete!: boolean;

  @Output() deleteTodo = new EventEmitter<string>();
  @Output() updateTodo = new EventEmitter<TodoCheckboxUpdate | TodoTextUpdate>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.inputEditText = this.todoText;
  }

  get todoTextClasses() {
    return this.isComplete ? ['linethrough', 'text-muted'] : [];
  }

  get isComplete() {
    return this.todoIsComplete ? true : false;
  }

  inputChangeHandler(event: Event) {
    const el = event.target! as HTMLInputElement;
    this.inputEditText = el.value;
  }

  checkboxChangeHandler(val: boolean, id: string) {
    this.updateTodo.emit(
      new TodoCheckboxUpdate(id, val)
    );
  }

  formSubmitHandler(event: SubmitEvent, id: string) {
    event.preventDefault();
    if (
      this.inputEditText.length > this.todoService.minTodoTextLength &&
      this.inputEditText.length < this.todoService.maxTodoTextLength
    ) {
      this.updateTodo.emit(
        new TodoTextUpdate(id, this.inputEditText)
      );
    } else {
      this.inCorrectFormSubmit = true;
    }
  }

  cancelEditButtonClickHandler() {
    this.isEditing = false;
    this.inputEditText = this.todoText;
  }

  deleteButtonClickHandler(id: string) {
    this.deleteTodo.emit(id);
  }
}
