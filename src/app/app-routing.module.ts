import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/layout/home/shell/shell.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path:'',
    component:ShellComponent,
    children:[{
      path:'',
      redirectTo:'product',
      pathMatch: 'full'
    },
    {
      path:'product',
      loadChildren:()=>
      import("./components/product/product.module").then(p => p.ProductModule)
    }
  ]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
