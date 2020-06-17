import { ICategory } from './../model/Category';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IItemResponse, IItemListResponse } from '../model/common.model';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

private api = environment.API;

private categories:ICategory[]
private selectedCategorySource = new BehaviorSubject<ICategory | null>(null);
selectedCategoryChanges$ = this.selectedCategorySource.asObservable();

constructor(private http:HttpClient) { }

changeSelectedCategory(selectedCategory:ICategory | null):void{
  this.selectedCategorySource.next(selectedCategory);
}

getAllCategories():Observable<ICategory[]>{
  if(this.categories){
    return of(this.categories);
  }
  return this.http.get(this.api  + "admin/" + 'categories').pipe(tap((data:IItemListResponse) => this.categories = data.result),(map((res:IItemListResponse) => res.result)));
}

createCategory(category:ICategory):Observable<ICategory>{
  return this.http.post(this.api + "admin/" + 'categories',category).pipe((map((res:IItemResponse) => {
    this.categories.push(res.result)
    return res.result
  })))
}
updateCategory(category:ICategory,p:any):Observable<ICategory>{
  return this.http.put(this.api  + "admin/"+'categories/' + p,category).pipe((map((res:IItemResponse) => {
    this.categories.push(res.result)
    return res.result
  })))
}

newCategory(): ICategory {
  return {
   name:''
  };
}
}
