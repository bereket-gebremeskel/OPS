import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/Product';
import { Observable, BehaviorSubject } from 'rxjs';
import { IItemResponse, IItemListResponse } from '../model/common.model';
import { map } from 'rxjs/operators';
import { ICategory } from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = environment.API;
  private selectedProductSource = new BehaviorSubject<Product | null>(null);
selectedCategoryChanges$ = this.selectedProductSource.asObservable();

constructor(private http:HttpClient) { }

changeSelectedPoduct(selectedProduct:Product | null):void{
  this.selectedProductSource.next(selectedProduct);
}

getAllProducts():Observable<Product[]>{
  return this.http.get(this.api  + "admin/" + 'products').pipe((map((res:IItemListResponse) => res.result)));
 }

 getProductById(id):Observable<Product[]>{
  return this.http.get(this.api  + "admin/" + 'products/' + id).pipe((map((res:IItemListResponse) => res.result)));
 }

createProduct(product:Product):Observable<Product>{
  return this.http.post(this.api + 'admin/' +'products',product).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

updateProduct(product:Product):Observable<Product>{
  return this.http.put(this.api + 'admin/' +'products',product).pipe((map((res:IItemResponse) => 
     res.result
  )))
}

}
