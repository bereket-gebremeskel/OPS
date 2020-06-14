import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule, ActivatedRouteSnapshot, Resolve } from '@angular/router';
@Injectable()
export class productResolver implements  Resolve<any>{
  constructor() {}
    resolve(route:ActivatedRouteSnapshot){
      console.log('route',route)
    // const id = route.params['id'];
      return "queryiedddddddddd"
    }
  }

const routes: Routes = [
  { 
    path:'',
    component:ProductComponent
   },
  
   {
     path:'detail',
     component:ProductDetailComponent
   },
   { 
    path:':id',
    component:ProductComponent,
    resolve:{
      products:productResolver
    }
   },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductComponent,ProductDetailComponent],
  providers:[productResolver]
})
export class ProductModule { }
