import { Directive, Input, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMakeBigger]'
})
export class MakeBiggerDirective {
  size=28;
  @HostBinding('style.font-size.px') mySize;
  @HostListener('mouseleave') increaseSize(){

    this.mySize=this.size+2;
    this.size=this.mySize;
  }

  constructor(private element: ElementRef, private render2: Renderer2) { }

  

}
