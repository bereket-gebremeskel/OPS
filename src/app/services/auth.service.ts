import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItemResponse, IItemListResponse } from '../model/common.model';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.API;

  constructor(private http: HttpClient) { }
  login(user: any): Observable<any> {
    return this.http.post(this.api + 'users/' + 'login', user).pipe((map((res: IItemResponse) =>
      res.result
    )))
  }

  getAccessToken() {
    return localStorage.getItem('token')
  }
  getCurrentUserApi(): Observable<any> {
    return this.http.get(this.api + "all-users/me").pipe((map((res: IItemListResponse) => res.result)));
  }

  isloggedIn(){
    return !!localStorage.getItem('token');
  }
}
