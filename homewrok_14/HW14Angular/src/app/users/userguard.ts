import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserGuard implements CanActivate {
    id: string;
    constructor(private route: ActivatedRoute, private serv: DataService, private router: Router){};

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable <boolean> | boolean {
        const data = this.serv.getCachedData();
        this.id = route.params.uuid;
        let isFound = false;

        data.results.forEach(element => {
            if(element.login.uuid == this.id) {
                isFound = true;
            } 
        });

        if(isFound) return true;
        this.router.navigateByUrl('users/user/notfound');
    }
}