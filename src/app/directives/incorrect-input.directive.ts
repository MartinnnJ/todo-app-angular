import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appInCorrectInput]'
})
export class InCorrectInputDirective implements OnChanges {
  @HostBinding('value')
  @Input()
  value!: string;

  constructor(private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isInputInCorrect = changes['isInputInCorrect'];
    const el = this.elRef.nativeElement;

    if (
      isInputInCorrect?.firstChange === false &&
      isInputInCorrect?.currentValue === true &&
      (el !== document.activeElement)
      ) {
        el.focus();
      }
  }

  @Output() valueChange = new EventEmitter<string>();

  @HostBinding('class.incorrect')
  @Input()
  isInputInCorrect: boolean = false;

  @Output() isInputInCorrectChange = new EventEmitter<boolean>();

  @HostListener('input')
  inputValueChange() {
    this.isInputInCorrectChange.emit(false);
  }

  @HostListener('focusout')
  inputLostFocus() {
    this.isInputInCorrectChange.emit(false);
  }

  @HostListener('keydown', ['$event'])
  clearInput(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.valueChange.emit('');
    }
  }
}
