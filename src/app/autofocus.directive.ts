import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';
// https://davidmcintosh.medium.com/auto-focusing-an-angular-input-the-easy-way-part-2-directives-ac9dc9a7ec73
@Directive({
  selector: '[appAutoFocus]'
})
export class AutofocusDirective implements AfterContentInit {
  @Input() autoFocus!: boolean;

  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    this.el.nativeElement.focus();
  }
}
