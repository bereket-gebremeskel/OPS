import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

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
  constructor(private route:Router) { }

  ngOnInit() {
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
              {label: 'category',routerLink:['/setting/category']},
              {label: 'Sub-Category',routerLink:['/setting/sub-category']}
          ]
      },
      {
        label:'My Products',routerLink:['/product/list']
      }
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
}
