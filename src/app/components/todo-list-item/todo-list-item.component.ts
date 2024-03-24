import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../../todo.service';
import TodoCheckboxUpdate from '../../models/todo-checkbox-update.model';
import TodoTextUpdate from '../../models/todo-text-update.model';
import TodoPriorityUpdate from '../../models/todo-priority-update.model';

let timerId: any; // for debouncing

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css'
})
export class TodoListItemComponent implements OnInit {
  isEditing = false;
  inCorrectFormSubmit = false; // two-way binding
  inputEditText = ''; // two-way binding
  priorityValue = 1; // two-way binding

  @Input() todoId!: string;
  @Input() todoText!: string;
  @Input() todoPriority!: number;
  @Input() todoIsComplete!: boolean;

  @Output() deleteTodo = new EventEmitter<string>();
  @Output() updateTodo = new EventEmitter<TodoCheckboxUpdate | TodoTextUpdate | TodoPriorityUpdate>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.inputEditText = this.todoText;
    this.priorityValue = this.todoPriority;
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

  priorityChangeHandler(event: Event, id: string) {
    const el = event.target! as HTMLInputElement;
    this.priorityValue = +el.value;
    // debouncing
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      console.log('todo priority updated');
      this.updateTodo.emit(
        new TodoPriorityUpdate(id, this.priorityValue)
      )
    }, 600);
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
