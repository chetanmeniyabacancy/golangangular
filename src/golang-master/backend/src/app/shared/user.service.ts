import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import{ GlobalConstants } from '../common/global-constants';

@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) { }
  formData: User = new User();
  list: User[];


  postLogin() {
    const body = new HttpParams()
    .set('email', this.formData.Email)
    .set('password', String(this.formData.Password));

    return this.http.post(`${GlobalConstants.apiURL}login`,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('No-Auth', 'True')
      }
    );
  }

  logout() {
    return this.http.get(`${GlobalConstants.apiURL}logout`);
  }

}
