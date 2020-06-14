import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private route:Router) { }

  ngOnInit() {
  }
  filterData(value = null){
    if(value){
      this.filter = this.data.filter(x => {
     
        return x.includes(value)
       })
       if(this.filter.length){
        this.isSearch = true;
      }else{
        this.isSearch = false
        console.log(value)
      }
      
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
