import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'
]
})
export class ProductComponent implements OnInit {
  
  products: Product[];

  constructor(private router:ActivatedRoute,private productService:ProductService,private route:Router) { }

  ngOnInit() {
    this.router.queryParams.subscribe((res) => {
      console.log("in product list",res)
      if(res.q){
        console.log("fsda",res)
      }else{
        this.productService.getAllProducts().subscribe(res => this.products = res)
      }
    })
  }


  navigateToDetail(product){
    this.route.navigate(['/product',product._id,'items'])
  }

}