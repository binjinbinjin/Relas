import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverAddBorder]'
})
/**Add the solid border to element for mouseover, remove any border when mouseout */
export class HoverAddBorderDirective {

  constructor(private el: ElementRef) { }

  /**Change the border to 'solid' when mouseover */
  @HostListener('mouseover') mouseover() {
    this.el.nativeElement.style.border = 'solid';
  }

  /**Remove border when mouseout */
  @HostListener('mouseout') mouseout() {
    this.el.nativeElement.style.border = null;
  }

}
