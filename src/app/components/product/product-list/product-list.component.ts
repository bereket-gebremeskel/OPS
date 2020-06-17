import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddItemComponent } from './add-item/add-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService, public dialogService: DialogService,private route:Router) { }

  ngOnInit() {
    this.load();
  }
  load() {
    this.productService.getAllProducts().subscribe(res => this.products = res)
  }
  addItem(product) {
    const ref = this.dialogService.open(AddItemComponent, {
      data: product,
      header: 'Add Item',
      width: '70%'
    });

    ref.onClose.subscribe((c) => {
      if (c) {
        this.load();
      }
    });
  }

  navigateToDetail(product){
    this.productService.changeSelectedPoduct(product);
    this.route.navigate(['/product',product._id,'items'])
  }
  navigateToedit(product){
    this.route.navigate(['/product',product._id,'edit'])
  }
}
