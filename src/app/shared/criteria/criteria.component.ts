import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {

  @Input() dispalyDetail:boolean;
  constructor() { 
   
  }

  ngOnInit(): void {
  }

}
