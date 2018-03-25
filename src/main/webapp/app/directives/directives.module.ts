import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverPointerDirective } from './css/hover-pointer.directive';
import { HoverAddBorderDirective } from './css/hover-add-border.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HoverPointerDirective, HoverAddBorderDirective],
  exports: [HoverPointerDirective, HoverAddBorderDirective]
})
export class DirectivesModule { }
