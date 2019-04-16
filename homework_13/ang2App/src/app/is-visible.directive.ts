import {Directive, ElementRef, HostBinding, Input, Renderer2, HostListener} from '@angular/core';

@Directive({
  selector: '[appIsVisible]'
})
export class IsVisibleDirective {

  @Input() display=true;
  @HostBinding('style.display') myDisplay;
  
  constructor(private element: ElementRef, private render2: Renderer2) {

  }

  ngOnInit() {
    if(this.display==false)
      this.myDisplay = 'none';
  }

}

