import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/layout/home/shell/shell.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignUpComponent
  },
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
    },
    {
      path:'profile',
      loadChildren:()=> import("./components/user-profile/user-profile.module").then(u => u.UserProfileModule)
    }

    

  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
