import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

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
  constructor(private route:ActivatedRoute,private productService:ProductService) { }

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

  addToCart(){

  }

  placeOrder(){
    
  }
  // compareItemId(itemone,itemtwo){
  //   console.log( itemone ,itemtwo)
  //   return itemone && itemtwo? itemone._id === itemtwo._id : itemone === itemtwo
  // }
}
