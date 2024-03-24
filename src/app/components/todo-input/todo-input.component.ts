import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {
  inputText = ''; // two-way binding
  inCorrectFormSubmit = false; // two-way binding
  @Output() submitTodo = new EventEmitter<string>();

  constructor(private todoService: TodoService) {}

  inputChangeHandler(event: Event) {
    const el = event.target! as HTMLInputElement;
    this.inputText = el.value;
  }

  formSubmitHandler(event: SubmitEvent) {
    event.preventDefault();
    if (
      this.inputText.length > this.todoService.minTodoTextLength &&
      this.inputText.length < this.todoService.maxTodoTextLength
      ) {
      this.submitTodo.emit(this.inputText);
      this.inputText = '';
    } else {
      this.inCorrectFormSubmit = true;
    }
  }
}
