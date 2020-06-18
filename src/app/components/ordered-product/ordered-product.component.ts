import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PlaceOrderagainComponent } from './place-order/place-order.component';


@Component({
  selector: 'app-ordered-product',
  templateUrl: './ordered-product.component.html',
  styleUrls: ['./ordered-product.component.css']
})
export class OrderedProductComponent implements OnInit {

  items: any[];
  user: any;
  status: any;
  statuses: any[] = [
    {
      'name': 'Shipped',
      'value': 'SHIPPED'
    },
    {
      'name': 'On the way',
      'value': 'ON THE WAY'
    },
    {
      'name': 'Delivered',
      'value': 'DELIVERED'
    },


    {
      'name': 'Cancel',
      'value': 'CANCELLED'
    }
  ]
  constructor(private itemService: ItemService, private productService: ProductService,
    private route: Router, private shoppingCartService: ShoppingCartService, private userService: UserService, public dialogService: DialogService) { }

  ngOnInit() {
    // this.itemService.getAllItems().subscribe(items => this.items = items)
    this.user = this.userService.currentUser();
    this.getOrders();
  }
  getOrders() {
    this.shoppingCartService.getShoppingCartByUserId(this.user?._id).subscribe(items => {
      this.items = items;
    })
  }
  navigateToDetail(product) {
    this.productService.changeSelectedPoduct(product);
    this.route.navigate(['/product', product._id, 'items'])
  }
  placeOrderComponent(item) {
    console.log("iiiiiiiiiiiiiiiiiii")
    const ref = this.dialogService.open(PlaceOrderagainComponent, {
      data: item,
      header: 'form',
      width: '70%'
    });

    ref.onClose.subscribe((c) => {
      if (c) {

      }
    });
  }

}
