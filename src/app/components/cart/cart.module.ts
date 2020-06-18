import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes:Routes=[
  {
    path:'',
    component:CartComponent
  }
]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CartComponent,PlaceOrderComponent],
  exports:[PlaceOrderComponent],
  providers:[PlaceOrderComponent]
})
export class CartModule { }
