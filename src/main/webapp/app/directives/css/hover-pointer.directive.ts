import { Directive, HostBinding, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHoverPointer]'
})
/**Change the cursor to pointer when hover over the element */
export class HoverPointerDirective {

  constructor(private el: ElementRef) {
  }

  /**Change the cursor to pointer when mouseover */
  @HostListener('mouseover') mouseover() {
    this.el.nativeElement.style.cursor = 'pointer';
  }
}
