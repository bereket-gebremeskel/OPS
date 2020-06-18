import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { PlaceOrderComponent } from '../../cart/place-order/place-order.component';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
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
  constructor(public dialogService: DialogService,private route:ActivatedRoute,private productService:ProductService,private userService:UserService,private router:Router,private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
    this.route.data.subscribe(res => {
      // this.productService.selectedCategoryChanges$.subscribe((res:[]) => {
      //   console.log('behavioural',res);
      
      // })

      this.items = res.items;
       this.product = this.items[0];
       this.price = this.product?.price;
       this.stockQuantity = this.product?.stockQuantity
       console.log("single product" ,this.product)
       this._item = this.product
     
      this.user =this.userService.currentUser();
      this.getCarts();
      
      let singleProdId = this.product?.product?._id;
     
      // this.user.shoppingCart.forEach(item => {
      //   let prodId :string= item.product?._id;
      //   console.log("hehhhhhhhhh",item.product._id ,this.product.product._id)
      //   if(prodId== singleProdId){
        
          
      //     this.isInCart = true
      //   }
      // })
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
      console.log("iteemmmsss" ,this.carts)
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
    console.log(itemId)
     this.userService.addItemToCart({"userId":this.user?._id,"itemId":itemId}).subscribe(res =>{
      this.userService.changeCartNumber(true);
      this.isInCart = true
     });
  }
  

  placeOrder(){
    
  }
  navigateToCart(id){
    this.router.navigate(['/cart'])
  }

  placeOrderComponent(item){
    console.log("iiiiiiiiiiiiiiiiiii",item)
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
}
