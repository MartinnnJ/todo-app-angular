import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-sort',
  templateUrl: './todo-sort.component.html',
  styleUrl: './todo-sort.component.css'
})
export class TodoSortComponent implements OnInit {
  dropdownData = [
    { value: 0, label: 'Default' },
    { value: 1, label: 'Ascending' },
    { value: 2, label: 'Descending'}
  ];
  isOpen = false;

  @Input() selectValue!: number;
  @Output() selectValueChange = new EventEmitter<number>();
  @Output() sortTodos = new EventEmitter();

  ngOnInit(): void {
    window.addEventListener(
      'click',
      this.outsideDropdownClick.bind(this)
    );
  }

  get dropdownLabelText() {
    return this.dropdownData
      .find(item => item.value === this.selectValue)?.label;
  }

  get cssButtonClasses() {
    return this.isOpen ?
      ['btn', 'btn-secondary', 'dropdown-toggle', 'show'] :
      ['btn', 'btn-secondary', 'dropdown-toggle'];
  }

  get cssListClasses() {
    return this.isOpen ? ['dropdown-menu', 'show'] : ['dropdown-menu'];
  }

  outsideDropdownClick(event: MouseEvent) {
    const elClicked = event.target as HTMLElement;
    const isDropdownClicked = (
      elClicked.classList.contains('dropdown-toggle') ||
      elClicked.classList.contains('dropdown-item')
    );
    if (!isDropdownClicked) {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }

  listItemSelected(event: MouseEvent) {
    const el = event.target as HTMLAnchorElement;
    const newValue = +el.dataset['value']!;
    this.selectValueChange.emit(newValue);
    this.isOpen = false;
  }

  sortButtonClicked() {
    this.sortTodos.emit();
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
