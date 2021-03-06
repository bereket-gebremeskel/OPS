import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { PlaceOrderComponent } from '../../cart/place-order/place-order.component';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  styles:[
    `
        :host ::ng-deep button {
            margin-right: .25em;
        }

        :host ::ng-deep .custom-toast .ui-toast-message {
            background: #FC466B;
            background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
            background: linear-gradient(to right, #3F5EFB, #FC466B);
        }

        :host ::ng-deep .custom-toast .ui-toast-message div {
            color: #ffffff;
        }

        :host ::ng-deep .custom-toast .ui-toast-message.ui-toast-message-info .ui-toast-close-icon {
            color: #ffffff;
        }
    `
  ]
})
export class ProductDetailComponent implements OnInit {

  product: any={};
  items:any[];
  units:any[];
  price:number;
  stockQuantity:number;
  _item:any={};
  itemId:string;
  user:any;
  isInCart:boolean = false;
  carts: any[];
  userId :string;
  reviews: any={};
  reivewId: any;
  constructor(private messageService: MessageService, public dialogService: DialogService,private route:ActivatedRoute,private productService:ProductService,private userService:UserService,private router:Router,private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
    this.addSingle();
    this.route.data.subscribe(res => {
      this.items = res.items;
       this.product = this.items[0];
       this.price = this.product?.price;
       this.stockQuantity = this.product?.stockQuantity
       this._item = this.product
     
      this.user =this.userService.currentUser();
      this.userId = this.user?._id;
      if(this.user){
        this.getCarts();
      }
      this.getReviews(this.product?.product?._id);
    })
  
  }



  getCarts(){
    let singleProdId = this.product?.product?._id;
    this.shoppingCartService.getShoppingCartByUserId(this.user?._id).subscribe(items => {
      this.carts = items;
       this.carts.forEach(item => {
        let prodId :string= item?.item?.product?._id;
        if(prodId== singleProdId){
        
          
          this.isInCart = true
        }
      })
    })
  }

  get item(){
    return this._item;
  }
  set item(item:any){

    this._item = item;
    this.itemId = item._id
    this.stockQuantity = this._item?.stockQuantity;
    this.price = this._item?.price;
 
  }

  addToCart(itemId:string){
     this.userService.addItemToCart({"userId":this.user?._id,"itemId":itemId}).subscribe(res =>{
      this.userService.changeCartNumber(true);
      this.isInCart = true;
     this. addSingle();
     });
  }
  

  placeOrder(){
    
  }
  navigateToCart(id){
    this.router.navigate(['/cart'])
  }

  placeOrderComponent(item){
    const ref = this.dialogService.open(PlaceOrderComponent, {
      data: item,
        header: 'form',
        width: '70%'
    });
  
    ref.onClose.subscribe((c) => {
      this.router.navigate(['/orders'])
      if (c) {
       
      }
  });
  }

  getReviews(id:string){
    this.productService.getProductReivews(id).subscribe(res => {
      this.reviews = res;
      this.reivewId = this.reviews._id
    })
  }
  approveReview(id:string,approve:string){
    this.userService.approveReview({"textId":id,"reviewStatus":approve,"reviewId":this.reivewId}).subscribe(res => {
      this.getReviews(this.product?.product?._id);
      this.addSingle();
    })
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Confirmation', detail:'Operation successful'});
}
}
