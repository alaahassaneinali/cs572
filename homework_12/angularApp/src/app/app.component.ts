import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-counter [counter]="ComponentCounterValue" (onChangeValue)="setCompCounterValue($event)" ></app-counter><br> <p>Component Counter Value: {{ComponentCounterValue}}</p>',
   
  styles:[`p {
    margin: auto;
    width: 60%;
    border: 3px solid #73AD21;
    padding: 10px;
  }`
]
})
export class AppComponent {
  ComponentCounterValue:number=5; 
  title = 'CounterAPP';
  setCompCounterValue(val:number){   
  this.ComponentCounterValue=val;
  console.log('Parent Component Counter:'+this.ComponentCounterValue);
}

}
