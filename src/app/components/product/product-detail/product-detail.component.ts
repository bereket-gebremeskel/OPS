import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private route:ActivatedRoute,private productService:ProductService,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.route.data.subscribe(res => {
      // this.productService.selectedCategoryChanges$.subscribe((res:[]) => {
      //   console.log('behavioural',res);
      
      // })
      this.items = res.items;
       this.product = this.items[0];
       this.price = this.product.price;
       this.stockQuantity = this.product.stockQuantity
       console.log("single product" ,this.product)
       this._item = this.product
      console.log("iteemmmsss" ,this.items)
      this.user =this.userService.currentUser()
      let singleProdId = this.product.product._id;
      this.user.shoppingCart.forEach(item => {
        let prodId :string= item.product._id
        if(prodId== singleProdId){
        
          console.log("hehhhhhhhhh",item.product._id ,this.product.product._id)
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
    this.stockQuantity = this._item.stockQuantity;
    this.price = this._item.price;
 
  }

  addToCart(itemId:string){
    console.log(itemId)
     this.userService.addItemToCart({"userId":this.user._id,"itemId":itemId}).subscribe(res => this.userService.changeCartNumber(true));
  }
  

  placeOrder(){
    
  }
  navigateToCart(id){
    this.router.navigate(['/cart'])
  }
  // compareItemId(itemone,itemtwo){
  //   console.log( itemone ,itemtwo)
  //   return itemone && itemtwo? itemone._id === itemtwo._id : itemone === itemtwo
  // }
}
