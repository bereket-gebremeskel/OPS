import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { IUnit } from '../model/unit';
import { Observable } from 'rxjs';
import { IItemListResponse } from '../model/common.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private api = environment.API;
  
constructor(private http:HttpClient) { }

getAllUnits():Observable<IUnit[]>{
  return this.http.get(this.api  + "admin/" + 'units').pipe((map((res:IItemListResponse) => res.result)));
 }

}
