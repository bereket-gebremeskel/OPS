import { SubCategoryListComponent } from './sub-category/sub-category-list/sub-category-list.component';
import { SubCategoryEditComponent } from './sub-category/sub-category-edit/sub-category-edit.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';

import { SharedModule } from './../../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'sub-category',
        component: SubCategoryComponent
      }
    ]
  }
]
@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
    
  ],
  declarations: [SettingComponent,
    CategoryComponent,
    CategoryEditComponent,
    CategoryListComponent,
    SubCategoryComponent,
    SubCategoryEditComponent,
    SubCategoryListComponent],
  providers: [ProductCategoryService,SubCategoryService],
  entryComponents:[
    SubCategoryEditComponent
  ]
})
export class SettingModule { }
