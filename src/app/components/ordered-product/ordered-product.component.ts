import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PlaceOrderagainComponent } from './place-order/place-order.component';
import { CommentComponent } from './comment/comment.component';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import {MessageService} from 'primeng/api';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-ordered-product',
  templateUrl: './ordered-product.component.html',
  styleUrls: ['./ordered-product.component.css']
})
export class OrderedProductComponent implements OnInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
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
  test:"bek"
  constructor(private messageService: MessageService,private itemService: ItemService, private productService: ProductService,
    private route: Router, private shoppingCartService: ShoppingCartService, private userService: UserService, public dialogService: DialogService) { }

  ngOnInit() {
    // this.itemService.getAllItems().subscribe(items => this.items = items)
    this.user = this.userService.currentUser();
    this.getOrders();
  }
  getOrders() {
    this.userService.getOrdersByuserId(this.user?._id).subscribe(items => {

      this.items = items;
      console.log("this items i",items)
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
      console.log('ccccccccc',c)
      if (c) {
        this.userService.getOrderInformationById(item._id).subscribe(res => {
          console.log('xxxxxxxxxxxxxx',res)
          this.orderConfirmation(res[0]?.orderInformation)
        })
      }
    });
  }


  addComment(item) {
    console.log("beki")
    const ref = this.dialogService.open(CommentComponent, {
      data: item,
      header: 'Comment',
      width: '50%'
    });

    ref.onClose.subscribe((c) => {
      if (c) {
        this.addSingle();
      }
    });
  }

  changeStatus(id){
    this.itemService.changeOrderStatus({'orderId':id,'userId':this.user?._id,'orderStatus':'CANCELLED'}).subscribe(res=>{
      this.addSingle();
      this.getOrders()})
  }
 
 public downloadAsPDF() {
  const doc = new jsPDF();

  const specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };

  const pdfTable = this.pdfTable.nativeElement;

  doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    width: 190,
    'elementHandlers': specialElementHandlers
  });

  doc.save('tableToPdf.pdf');
}
 addSingle() {
  this.messageService.add({severity:'success', summary:'Confirmation', detail:'Operation successful'});
}

orderConfirmation(text) {
  this.messageService.add({severity:'success', summary:'Confirmation', detail:text});
}
}
