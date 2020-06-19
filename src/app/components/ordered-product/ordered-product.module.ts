import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderedProductComponent } from './ordered-product.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlaceOrderagainComponent } from './place-order/place-order.component';
import { SellerOrdersComponent } from './seller-orders/seller-orders.component';
import { CommentComponent } from './comment/comment.component';
import {ToastModule} from 'primeng/toast';

const routes:Routes = [
  {
    path:'',
    component:OrderedProductComponent
  },{
    path:'o',
    component:SellerOrdersComponent
  }
  
]
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    ToastModule
  ],
  declarations: [OrderedProductComponent,PlaceOrderagainComponent,SellerOrdersComponent,CommentComponent],
  entryComponents:[PlaceOrderagainComponent,CommentComponent]
})
export class OrderedProductModule { }
 