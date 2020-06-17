import { Observable } from 'rxjs';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/model/Category';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: ICategory[];
  selectedCategory: ICategory | null;
  constructor(private categoryService: ProductCategoryService) { }

  ngOnInit() {
    this.categoryService.selectedCategoryChanges$.subscribe((selectedCategory) => {
    })
    this.load();
  }

  load() {
     this.categoryService.getAllCategories().subscribe(category => {
      this.categories = category
    });
  }

  newProduct() {
    this.categoryService.changeSelectedCategory(this.categoryService.newCategory());
  }

  categorySelected(category: ICategory): void {
    this.categoryService.changeSelectedCategory(category);
  }
}
