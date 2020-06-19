import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
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
  return this.http.post(this.api + 'users/' +'register',user).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

updateUser(user:User):Observable<User>{
  return this.http.put(this.api + 'admin/' +'users',user).pipe((map((res:IItemResponse) => 
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

createOrder(user):Observable<any>{
  return this.http.put(this.api + 'admin/' +'users/' +'placeSingleOrder',user).pipe((map((res:IItemResponse) => 
     res.result
  )))
}
buyNow(user):Observable<any>{
  return this.http.put(this.api + 'admin/' +'users/' +'buyNow',user).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

currentUser(){
  return JSON.parse(window.localStorage.getItem("userData"));
}

getOrdersByuserId(id):Observable<any>{
  return this.http.get(this.api  + "admin/" + 'users/' + 'orders/' + id).pipe((tap(res => console.log('in tapsssss',res))),(map((res:IItemListResponse) => res.result)));
}

getOrdersByseller(id):Observable<any>{
  return this.http.get(this.api  + "admin/" + 'users/' + 'sellerOrders/' + id).pipe((tap(res => console.log('in tap',res))),(map((res:IItemListResponse) => res.result)));
}

changeStatus(user):Observable<any>{
  return this.http.put(this.api + 'admin/' +'users/' +'userStatus',user).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

comment(user):Observable<any>{
  return this.http.post(this.api + 'admin/' +'products/' +'review',user).pipe((map((res:IItemResponse) => 
     res.result
  )))
}
getOrderInformationById(id):Observable<any>{
  return this.http.get(this.api  + "admin/" + 'orders/' + 'findByOrderInformationId/' + id).pipe((map((res:IItemListResponse) => res.result)));
 }

approveReview(review:any):Observable<any>{
  return this.http.put(this.api + 'admin/' +'products/' + 'reviewStatus',review).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

}
