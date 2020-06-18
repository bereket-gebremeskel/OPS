import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from '../../shared/shared.module';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ProductListComponent } from './product-list/product-list.component';
import { AddItemComponent } from './product-list/add-item/add-item.component';
import { ItemService } from 'src/app/services/item.service';
import { ProductService } from 'src/app/services/product.service';
import { Observable, concat } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable()
export class productResolver implements  Resolve<any>{
  constructor() {}
    resolve(route:ActivatedRouteSnapshot){
      console.log('route',route)
    // const id = route.params['id'];
      return "queryiedddddddddd"
    }
  }
  @Injectable()
export class itemResolver implements  Resolve<any>{
  constructor(private itemService:ItemService,private productService:ProductService) {}
    resolve(route:ActivatedRouteSnapshot){
      console.log('route',route)
     const id = route.params['id'];
    //  let singleproduct =  this.productService.getProductById(id);
     let items = this.itemService.getItemByProductId(id);
      // return singleproduct.pipe(switchMap(product => {
      //   return items
      // }))
      return items;
      // return concat(singleproduct,items);
    }
  }

  @Injectable()
  export class productByResolver implements  Resolve<any>{
    constructor(private itemService:ItemService,private productService:ProductService) {}
      resolve(route:ActivatedRouteSnapshot){
        console.log('route',route)
       const id = route.params['id'];
        let singleproduct =  this.productService.getProductById(id);
        return singleproduct;
      }
    }

  

const routes: Routes = [
  { 
    path:'',
    component:ProductComponent
   },
   {
    path:'add',
    component:AddProductComponent
  },
  {
    path:'list',
    component:ProductListComponent
  },
  //  {
  //    path:'detail',
  //    component:ProductDetailComponent
  //  },
   { 
    path:':id/edit',
    component:AddProductComponent,
    resolve:{
      product:productByResolver
    }
   },
   { 
    path:':id/items',
    component:ProductDetailComponent,
    resolve:{
      items:itemResolver
    }
   },
   
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    RouterModule ,
    
  ],
  declarations: [ProductComponent,ProductDetailComponent,AddProductComponent,ProductListComponent,AddItemComponent],

  providers:[productResolver,SubCategoryService,itemResolver,productByResolver],
  entryComponents:[
    AddItemComponent
  ]
})
export class ProductModule { }
