import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-select',
  templateUrl: './todo-select.component.html',
  styleUrl: './todo-select.component.css'
})
export class TodoSelectComponent {
  selectData = [
    { value: "0", label: "All" },
    { value: "1", label: "Fulfilled" },
    { value: "2", label: "Unfulfilled" },
  ];

  @Input() selectValue!: string;
  @Output() selectValueChange = new EventEmitter<string>();

  selectChangeHandler(event: Event) {
    const el = event.target! as HTMLSelectElement;
    const newValue = el.value;
    this.selectValueChange.emit(newValue);
  }
}
