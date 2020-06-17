import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { SubCategory } from '../model/subCategory';
import { IItemListResponse, IItemResponse } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private api = environment.API;
constructor(private http:HttpClient) { }

getAllSubCategories():Observable<SubCategory[]>{
  return this.http.get(this.api  + "admin/" + 'sub-categories').pipe((tap(res => console.log(res))),(map((res:IItemListResponse) => res.result)));
 }

createSubCategory(category:{}):Observable<any>{
  return this.http.post(this.api + "admin/" + 'sub-categories',category).pipe((map((res:IItemResponse) => {
    return res.result
  })))
}
updateSubCategory(category:any={}):Observable<any>{
  return this.http.put(this.api + "admin/" + 'sub-categories',category).pipe((map((res:IItemResponse) => {
    return res.result
  })))
}

getSubCategoryByCategoryId(id):Observable<SubCategory[]>{
  return this.http.get(this.api  + "admin/" + 'sub-categories/' + 'category/' + id).pipe((map((res:IItemListResponse) => res.result)));
 }

}
