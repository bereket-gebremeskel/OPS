import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderedProductComponent } from './ordered-product.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlaceOrderagainComponent } from './place-order/place-order.component';

const routes:Routes = [
  {
    path:'',
    component:OrderedProductComponent
  }
]
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderedProductComponent,PlaceOrderagainComponent],
  entryComponents:[PlaceOrderagainComponent]
})
export class OrderedProductModule { }
 