import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IItemListResponse } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private api = environment.API;

constructor(private http:HttpClient) { }

getAddresses():Observable<any[]>{
  return this.http.get(this.api  + "admin/" + 'address').pipe((map((res:IItemListResponse) => res.result)));
 }

}
