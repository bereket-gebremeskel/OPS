import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items:any[];
  constructor(private itemService:ItemService,private productService:ProductService,private route:Router) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe(items => this.items = items)
  }

  navigateToDetail(product){
    this.productService.changeSelectedPoduct(product);
    this.route.navigate(['/product',product._id,'items'])
  }

}
