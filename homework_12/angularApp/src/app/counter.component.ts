import { Component, OnInit, Input ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-counter',
  outputs:['onChangeValue'],
  template: `
  <div class="center">
  Enter number: <input type="text" name="txtcounter" [value]="counter" (input)="counter=$event.target.value" (keyup)="sendtoParent()" >
  <br>
  <button type="button" (click)="increase()">+</button>       {{counter}} 
  <button type="button" (click)="decrease()">-</button>  <br>   
  </div>
  `,
  styles:[`.center {
    margin: auto;
    width: 60%;
    border: 3px solid #73AD21;
    padding: 10px;
  }`
]

})

export class CounterComponent implements OnInit {
   onChangeValue:EventEmitter<number>;   
   @Input() counter:number
  constructor() { 
    this.counter=0;
    this.onChangeValue=new EventEmitter();
    }

  ngOnInit() {
  }
  increase(){
    this.counter++
    this.sendtoParent();
    //this.onChangeValue.emit(this.counter);
  }
  decrease(){
    this.counter--;
    this.sendtoParent();
    //this.onChangeValue.emit(this.counter);
  }

  sendtoParent(){ 
  this.onChangeValue.emit(this.counter);
  console.log('Child Component Counter:'+this.counter);
}
}
