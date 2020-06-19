import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { SubCategoryEditComponent } from '../sub-category-edit/sub-category-edit.component';
import { SubCategory } from 'src/app/model/subCategory';
import { SubCategoryService } from 'src/app/services/sub-category.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {

  subcategories:SubCategory[];
  constructor(public dialogService: DialogService,private subCategoryService:SubCategoryService) { }

  ngOnInit() {
   this. load();
  }

  load(){
    this.subCategoryService.getAllSubCategories().subscribe(res => this.subcategories = res)
  }
  newProduct(){}

  updateCategory(){
    
  }

  show() {

    const ref = this.dialogService.open(SubCategoryEditComponent, {
        header: 'form',
        width: '70%'
    });

    ref.onClose.subscribe((c) => {
      this.load();
      if (c) {

      }
  });
}
update(subcategory) {

  const ref = this.dialogService.open(SubCategoryEditComponent, {
    data: subcategory,
      header: 'form',
      width: '70%'
  });

  ref.onClose.subscribe((c) => {
    if (c) {

    }
});
}
}
