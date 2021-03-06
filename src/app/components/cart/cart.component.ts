import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: any[];
  user: any;
  constructor(private messageService: MessageService,private itemService: ItemService, private productService: ProductService,
    private route: Router, private userService: UserService, public dialogService: DialogService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.user = this.userService.currentUser();
    this.getCarts();
  }
  getCarts() {
    this.shoppingCartService.getShoppingCartByUserId(this.user?._id).subscribe(items => {
      this.items = items;
    })
  }
  navigateToDetail(product) {
    this.productService.changeSelectedPoduct(product);
    this.route.navigate(['/product', product._id, 'items'])
  }

  removeFromCart(id) {
    this.shoppingCartService.removeCart({'shoppingCartId':id,'userId':this.user._id}).subscribe(res => {
      this.getCarts()
    })
  }

  placeOrderComponent(item) {
    const ref = this.dialogService.open(PlaceOrderComponent, {
      data: item,
      header: 'form',
      width: '70%'
    });

    ref.onClose.subscribe((c) => {
      // this.route.navigate(['/orders'])
  
      if (c) {
            this.getCarts();
        this.userService.getOrderInformationById(c._id).subscribe(res => {
          this.orderConfirmation(res.orderInfromation)
        })
      }
    });
  }
  orderConfirmation(text) {
    this.messageService.add({severity:'success', summary:'Confirmation', detail:text});
  }
}
