import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { SubCategory } from 'src/app/model/subCategory';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.css']
})
export class SubCategoryEditComponent implements OnInit {

  pageTitle:string="Add Sub-Category";
  subCategory:FormGroup ;
  categories: any[];
  
  constructor( private fb:FormBuilder,public ref: DynamicDialogRef, public config: DynamicDialogConfig,private subCategoryService:SubCategoryService, private categoryService: ProductCategoryService) { }

  ngOnInit() {
    this.subCategory = this.config.data;
    this.subCategory = this.fb.group({
      name:[''],
      categoryId:['']
    })
    this.categoryService.getAllCategories().subscribe(res => this.categories =  res);
  }

  save(){
    // if(this.subCategory._id){
    //   let s :any={};
    //   s._id = this.subCategory._id;
    //   s.name = this.subCategory.name;
    //   s.categoryId = this.subCategory.category._id
    //   this.subCategoryService.updateSubCategory(s).subscribe(res => this.ref.close("hiiiii"))
    // }else{
      this.subCategoryService.createSubCategory(this.subCategory.value).subscribe(res => this.ref.close("hiiiii"))
    // }
   
   
  } 

  cancelEdit(){

  }
}
