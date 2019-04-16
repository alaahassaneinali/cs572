import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-smart',
  template: `
       
  Student Name:<input type="text" name="stuName" (input)="stuName=$event.target.value" ><br><br>
  Student ID:<input type="text" name="stuID" (input)="stuID=$event.target.value"><br><br>
  <button type="button" (click)="add()">Add Student</button>
  <br>

        <app-dumb [empsDumb]="emps"></app-dumb>
  `,
  styleUrls: ['./smart.component.css']
})
export class SmartComponent implements OnInit {
   stuName:string;
   stuID:number;
   emps;
  constructor() { 
    this.emps=[{name:'Ari',id:986816},
                  {name:'Alaa',id:986923},
                  {name:'TSO',id:986925}];                 
  }
  add(){  

    // using slice to change object memory so CD can identify the difference between the old and new object in dumb comp
    this.emps.push({name:this.stuName,id:this.stuID});
    this.emps=this.emps.slice();    
   //  this.emps.push({name:this.stuName,id:this.stuID});    
  }

  ngOnInit() {
    
  }
 

}
