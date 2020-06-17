import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/layout/home/shell/shell.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path:'',
    component:ShellComponent,
    children:[
      {
      path:'',
      redirectTo:'product',
      pathMatch: 'full'
      },
    {
      path:'product',
      loadChildren:()=>
      import("./components/product/product.module").then(p => p.ProductModule)
    },
    {
      path:'setting',
      loadChildren:()=> import("./components/setting/setting.module").then(s => s.SettingModule)
    },
    {
      path:'cart',
      loadChildren:()=> import("./components/cart/cart.module").then(c => c.CartModule)
    },
    {
      path:'orders',
      loadChildren:()=> import("./components/ordered-product/ordered-product.module").then(o => o.OrderedProductModule)
    }

  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
