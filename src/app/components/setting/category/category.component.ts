import { ProductCategoryService } from './../../../services/product-category.service';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/model/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService:ProductCategoryService) { }

  ngOnInit() {
  }
save()
{
  // this.categoryService.createCategory(this.category).subscribe(res => res);
}}
