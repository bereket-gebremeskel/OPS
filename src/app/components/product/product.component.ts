import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'
]
})
export class ProductComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(res => console.log(res))
  }

}