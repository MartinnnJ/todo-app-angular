import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {
  incorrectInput = false;
  inputText = '';
  @Output() submitTodo = new EventEmitter<string>(); // creating custom event 'todoSubmit'

  constructor(private todoService: TodoService) {}

  get cssClasses() {
    return this.incorrectInput ? ['form-control', 'incorrect'] : ['form-control'];
  }

  inputChangeHandler(event: Event) {
    const el = event.target! as HTMLInputElement;
    this.inputText = el.value;
    this.incorrectInput = false;
  }

  formSubmitHandler(event: SubmitEvent) {
    event.preventDefault();
    if (
      this.inputText.length > this.todoService.minTodoTextLength &&
      this.inputText.length < this.todoService.maxTodoTextLength
      ) {
      this.submitTodo.emit(this.inputText); // emitting event with data
      this.inputText = '';
    } else {
      this.incorrectInput = true;
    }
  }
}
