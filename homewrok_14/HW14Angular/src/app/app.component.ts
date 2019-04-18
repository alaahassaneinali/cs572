import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>App Component</h1>
    <a [routerLink]="['/']">Home</a> | 
    <a [routerLink]="['users']">View Users</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private serv: DataService){}
}
