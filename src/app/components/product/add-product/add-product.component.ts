import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/model/Category';
import { SubCategoryService } from 'src/app/services/sub-category.service';
import { filter, map, tap } from 'rxjs/operators';
import { SubCategory } from 'src/app/model/subCategory';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  
  categories:ICategory[] 
  productForm:FormGroup;
  subCategories: any[];
  categoryId:any;
  product:Product;
  user:any;
  constructor(private fb: FormBuilder, private categoryService: ProductCategoryService,
    private subCategoryService:SubCategoryService,private productService:ProductService,private route:ActivatedRoute,private userServce:UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log('data',data)
      if(data.product){
        this.product = data.product;
        console.log("'console.log('data',this.product.subCategory.category._id)'",this.product.subCategory.category)
        this.getSubCategory(this.product.subCategory.category._id);

        this.pupulateData();
      }else{
      this.user =  this.userServce.currentUser();
      console.log('this.user',     this.user)
        this.productForm = this.fb.group({
          name:[''],
          userId:[this.user?._id],
          description:[''],
          imageUrl:[''],
          subCategoryId:[''],
    
        })
      }
      
    })
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res
    });
    // this.subCategoryService.getAllSubCategories().subscribe(res =>  {
     
    //   this.subCategories = res;
    // });
  
  }

  getSubCategory(id:string){
    let x = "bek"
    console.log("iddd",typeof(id))

    this.subCategoryService.getSubCategoryByCategoryId(id).subscribe(subcategories =>  {
      console.log("subcate",subcategories)
      this.subCategories = subcategories;
    });
  }

  save(){
    if(this.product?._id){
      this.productService.updateProduct(this.productForm.value).subscribe(res => {
        this.productForm.reset();
        this.previousState();
      })
    }else{
      this.productService.createProduct(this.productForm.value).subscribe(res => {
        this.productForm.reset();
        this.previousState();
      })
    }
   
  }
  pupulateData(){
    // this.productForm.patchValue({
    //   name:this.product.name,
    //   userId:this.product.userId,
    //   description:this.product.description,
    //   imageUrl:this.product.imageUrl,
    //   subCategoryId:this.product.subCategory.subCategoryId

    // });

    this.productForm = this.fb.group({
      _id : this.product._id,
      name:this.product.name,
      userId:this.product.userId,
      description:this.product.description,
      imageUrl:this.product.imageUrl,
      subCategoryId:this.product.subCategory.subCategoryId

    })
  }
  previousState() {
    window.history.back();
}
}
