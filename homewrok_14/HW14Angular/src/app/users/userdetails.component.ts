import { Component, OnInit, Input } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-userdetails',
  template: `
    <p> Name: {{this.user.name.first}}
        Gender: {{this.user.gender}} 
    </p>
  `,
  styles: []
})
export class UserdetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private serv: DataService) {}
  id: string;
  user: {
    name: {
      first: string,
      last: string
    },

    gender: string
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['uuid'];
      const data = this.serv.getCachedData();
      const user = data.results.find(e => {
        return e.login.uuid === this.id;
      });

      this.user = user;
    });
  }

}
