import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItemResponse } from '../model/common.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private api = environment.API;
  
constructor(private http:HttpClient) { }

createItem(item:any):Observable<any>{
  return this.http.post(this.api + 'admin/' +'items',item).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

getItemByProductId(id:any):Observable<any>{
  return this.http.get(this.api + 'admin/' +'items/' +'product/' + id).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

getAllItems():Observable<any>{
  return this.http.get(this.api + 'admin/' +'items').pipe((map((res:IItemResponse) => 
     res.result
  )))
}
}
