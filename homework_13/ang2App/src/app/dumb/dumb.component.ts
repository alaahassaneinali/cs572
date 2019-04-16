import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dumb',
  template: ` 
           <p>List of Employee</p>
           <ul>
           <li *ngFor="let element of empsDumb"> name:{{element.name}}, id: {{element.id}}</li>
           </ul>
           `,
  styleUrls: ['./dumb.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DumbComponent implements OnInit {

  @Input() empsDumb;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes){
   console.log("ngOnChanges fired");
  }

}
