import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IItemListResponse, IItemResponse } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.API;
  private cartNumberSource = new BehaviorSubject<boolean>(null);
  cartNumberChanges$ = this.cartNumberSource.asObservable();
  
  constructor(private http:HttpClient) { }

changeCartNumber(cartNumber:boolean | null):void{
  this.cartNumberSource.next(cartNumber);
}

getAllUsers():Observable<User[]>{
  return this.http.get(this.api  + "admin/" + 'users').pipe((map((res:IItemListResponse) => res.result)));
 }

 createUser(user:User):Observable<User>{
  return this.http.post(this.api + 'admin/' +'users',user).pipe((map((res:IItemResponse) => 
     res.result
  )))
}
getUserById(id):Observable<any>{
  return this.http.get(this.api  + "admin/" + 'users/' + id).pipe((map((res:IItemListResponse) => res.result)));
 }

 addItemToCart(cart:any):Observable<User>{
  return this.http.put(this.api + 'admin/' +'users/' + 'addCart',cart).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

currentUser(){
  return JSON.parse(window.localStorage.getItem("userData"));
}
}
