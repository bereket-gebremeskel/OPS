import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderedProductComponent } from './ordered-product.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:OrderedProductComponent
  }
]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderedProductComponent]
})
export class OrderedProductModule { }
