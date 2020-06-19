import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filterText:any;
  data:string[] = ["bek","hiwot","yeshi"];
  isSearch:boolean;
  filter:any[];
  items:MenuItem[];
  cartAmmount:number=0;
  isLoggedIn: boolean;
  user: any;

  constructor(private route:Router,private userService:UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser();
    console.log('22222',this.user)
    this.userService.getUserById(this.userService.currentUser()?._id).subscribe(user => {
      this.cartAmmount = user?.shoppingCart.length;
      this.isLoggedIn = true;
      // window.localStorage.setItem("userData",JSON.stringify(user));
      // console.log("useeeeeeeeeeeeeeee",this.userService.currentUser())
    });
    if(this.userService.currentUser()?._id){
      this.user = this.userService.currentUser();
      
    }
    this.userService.cartNumberChanges$.subscribe(res => {
      if(res == true){
        ++this.cartAmmount ;
      }else if(res == false){
        if(this.cartAmmount >0){
          --this.cartAmmount
        }
      }
    })
    this.items = [
      // {
      //     label: 'File',
      //     items: [
      //       {
      //             label: 'New', 
      //             icon: 'pi pi-fw pi-plus',
      //             items: [
      //                 {label: 'Project'},
      //                 {label: 'Other'},
      //             ]
      //         },
      //         {label: 'Open'},
      //         {label: 'Quit'}
      //     ]
      // },
      {
          label: 'Setting',
          icon: 'pi pi-cog',
          items: [
            {label: 'Users',routerLink:['/users']},
              {label: 'Category',routerLink:['/setting/category']},
              {label: 'Sub-Category',routerLink:['/setting/sub-category']}
          ]
      },
      // {
      //   label:'My Products',routerLink:['/product/list']
      // }
  ];
  }
  filterData(value = null){
    if(value){
      this.filter = this.data.filter(x => {
     
        return x.includes(value)
       })
       this.filter.length ? this.isSearch = true:this.isSearch=false;
      //  if(this.filter.length){
      //   this.isSearch = true;
      // }else{
      //   this.isSearch = false
      //   console.log(value)
      // }
      
    }else{
      this.isSearch = false
    }
   console.log(this.filter)
  }
  search(){
    this.isSearch = false;
    this.route.navigate(['product'],{queryParams:{'q':"sdfa"}})
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.route.navigate(['/login'])
  }
}
