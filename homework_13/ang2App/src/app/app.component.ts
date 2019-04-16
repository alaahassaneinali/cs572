import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `<app-smart></app-smart>

  <div appIsVisible [display]="true"> test isVisible Directive:current value [appIsVisible [display]="true]" </div>  
  <div appMakeBigger> mouse leave to make it bigger </div>  
  `,

  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang2App';
}
