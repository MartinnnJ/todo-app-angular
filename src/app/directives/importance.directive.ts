import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImportance]'
})
export class ImportanceDirective implements OnChanges {
  @Input() importance!: number;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    this.changeElStyle(this.importance);
  }

  setRendererStyles(cssProp: string, cssValue: string) {
    return this.renderer.setStyle(this.elRef.nativeElement, cssProp, cssValue);
  }

  changeElStyle(num: number) {
    if (num < 1) {
      num = 1;
    }

    if (num === 1) {
      this.setRendererStyles('border', '1px solid #dcdcdc');
    }
    if (num === 2) {
      this.setRendererStyles('border', '1px solid black');
    }
    if (num === 3) {
      this.setRendererStyles('border', '2px solid black');
    }
    if (num === 4 || num === 5) {
      this.setRendererStyles('border', '2px solid black');
      this.setRendererStyles('box-shadow', '0 0 0 0.15rem yellow');
    }
    if (num === 6 || num === 7) {
      this.setRendererStyles('border', '2px solid black');
      this.setRendererStyles('box-shadow', '0 0 0 0.25rem gold');
    }
    if (num > 7) {
      this.setRendererStyles('border', '2px solid black');
      this.setRendererStyles('box-shadow', '0 0 0 0.3rem orange');
    }
  }
}
