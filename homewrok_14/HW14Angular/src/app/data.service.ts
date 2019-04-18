import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) {
    this.downloadToCache();
  }

  async getOnlineData() {
    return await this.downloadToCache();
  }

  downloadToCache() {
    return new Promise((resolve, reject) => {
      this.http.get('https://randomuser.me/api/?results=10')
        .subscribe(result => {
          localStorage.setItem('users', JSON.stringify(result));
          resolve(result);
        });
    })
  }

  getCachedData() {
    return JSON.parse(localStorage.getItem('users'));
  }
}
