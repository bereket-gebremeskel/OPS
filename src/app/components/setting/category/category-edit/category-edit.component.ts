import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ICategory } from './../../../../model/Category';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  pageTitle: string = 'Product Edit';
  categoryForm: FormGroup;
  category: ICategory;

  constructor(private fb: FormBuilder, private categoryService: ProductCategoryService) { }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]

    });

    this.categoryService.selectedCategoryChanges$.subscribe(slectedCategory => this.displayCategory(slectedCategory))
  }

  displayCategory(category: ICategory | null) {
    this.category = category;
    if (this.category) {
      if (this.category._id) {
        this.categoryForm.reset();
        this.categoryForm = this.fb.group({
          name: [this.category.name, [Validators.required]]

        });
      } else {
        this.categoryForm.reset();
        this.categoryForm = this.fb.group({
          name: [this.category.name, [Validators.required]]
        });
      }
    }
  }

  save(): void {
    if (this.categoryForm.valid) {
      const p = {...this.category,...this.categoryForm.value}
      if (p._id) {
        this.categoryService.updateCategory(this.categoryForm.value,p._id).subscribe({
          next: category => {
            this.dispatcher(category)
            this.reset()
          }
        })
      } else {
        this.categoryService.createCategory(p).subscribe({
          next: category => {
            this.dispatcher(category);
            this.reset();
          }
        })
      }
    }
  }

  dispatcher(category) {
    this.categoryService.changeSelectedCategory(category)
  }

  reset() {
    this.categoryForm.reset();
  }
}
