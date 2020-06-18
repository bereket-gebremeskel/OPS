import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IItemListResponse } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  private api = environment.API;
  
  constructor(private http:HttpClient) { }

  getShoppingCartByUserId(id):Observable<any[]>{
    return this.http.get(this.api  + "admin/" + 'users/' + 'shoppingCarts/' + id).pipe((map((res:IItemListResponse) => res.result)));
   }
   removeCart(cart):Observable<any>{
    return this.http.put(this.api  + "admin/" + 'users/' + 'removeCart/' ,cart).pipe((map((res:IItemListResponse) => res.result)));
   }
}
