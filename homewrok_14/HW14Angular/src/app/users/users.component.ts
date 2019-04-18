import { Component, OnInit, ɵConsole } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-users',
  template: `
      <div>
      <ul>
        <li *ngFor="let user of users">
          <a [routerLink]="[user.login.uuid]">{{user.name.first}}</a>
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class UsersComponent implements OnInit {

  constructor(private serv: DataService) { }
  users: [object];

  ngOnInit() {
    const data = this.serv.getCachedData();
    this.users = data.results;
  }

}
