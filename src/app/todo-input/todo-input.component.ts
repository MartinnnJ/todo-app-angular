import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {
  minInputLength = 2;
  maxInputLength = 50;
  incorrectInput = false;
  inputText = '';
  @Output() todoSubmit = new EventEmitter<string>(); // creating custom event 'todoSubmit'

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
      this.inputText.length > this.minInputLength &&
      this.inputText.length < this.maxInputLength
      ) {
      this.todoSubmit.emit(this.inputText); // emitting event with data
      this.inputText = '';
    } else {
      this.incorrectInput = true;
    }
  }
}
