import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/layout/home/shell/shell.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { AuthGuardGuard } from './components/auth/authGuard.guard';

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
      redirectTo:'login',
      pathMatch: 'full'
      },
    {
      path:'product',
      loadChildren:()=>
      import("./components/product/product.module").then(p => p.ProductModule),
      
    },
    {
      path:'setting',
      canActivate:[AuthGuardGuard],
      loadChildren:()=> import("./components/setting/setting.module").then(s => s.SettingModule),
     
    },
    {
      path:'cart',
      canActivate:[AuthGuardGuard], 
      loadChildren:()=> import("./components/cart/cart.module").then(c => c.CartModule),
      
    },
    {
      path:'orders',
      canActivate:[AuthGuardGuard],
      loadChildren:()=> import("./components/ordered-product/ordered-product.module").then(o => o.OrderedProductModule)
    },
    {
      path:'profile',
      canActivate:[AuthGuardGuard],
      loadChildren:()=> import("./components/user-profile/user-profile.module").then(u => u.UserProfileModule)
    },
    {
      path:'users',
      canActivate:[AuthGuardGuard],
      loadChildren:()=> import("./components/user/user.module").then(u => u.UserModule)
    }

  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
