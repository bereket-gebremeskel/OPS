import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddItemComponent } from './add-item/add-item.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  userId:string;
  constructor(private messageService: MessageService,private productService: ProductService,private userService:UserService, public dialogService: DialogService,private route:Router) { }

  ngOnInit() {

    this.userId = this.userService.currentUser()?._id;
    this.load();
  }
  load() {
    this.productService.getProductBysellerId(this.userId).subscribe(res => this.products = res)
  }
  addItem(product) {
    const ref = this.dialogService.open(AddItemComponent, {
      data: product,
      header: 'Add Item',
      width: '70%'
    });

    ref.onClose.subscribe((c) => {
      if (c) {
        this.addSingle();
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
  delete(id:any){
    this.productService.deleteProduct(id).subscribe(res => {
      this.addSingle();
      this.load()})
  }
  addSingle() {
    this.messageService.add({severity:'success', summary:'Confirmation', detail:'Operation successful'});
  }
}
