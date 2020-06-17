import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { UnitService } from 'src/app/services/unit.service';
import { ItemService } from 'src/app/services/item.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  units:any[];
  itemForm:FormGroup
  constructor(private fb:FormBuilder,public ref: DynamicDialogRef, public config: DynamicDialogConfig,private itemService:ItemService,private unitService:UnitService) { }

  ngOnInit() {
    this.unitService.getAllUnits().subscribe(res => {
      this.units  = res,
      console.log("this.u",this.units )
    });
    this.itemForm = this.fb.group({
      price:[''],
      stockQuantity:[0],
      unitId:[''],
      productId:[this.config.data._id]
    });
  }

  save(){
    this.itemService.createItem(this.itemForm.value).subscribe(res => {
      this.ref.close("hiiiii")
    })
    
  }
}
