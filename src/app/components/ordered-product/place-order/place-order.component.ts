import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { AddressService } from 'src/app/services/address.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderagainComponent implements OnInit {

  orderForm:any={};
  addresses: any[];
  user:any;
  item:any;
  _address:any;
  showPrevious: boolean = true;
  fullAddress:string;
  constructor(private fb:FormBuilder,public ref: DynamicDialogRef, public config: DynamicDialogConfig,private addressService:AddressService,private userService:UserService) { }

  ngOnInit() {
    this.item = this.config.data;
    this.user = this.userService.currentUser();
    this.addressService.getAddresses().subscribe(res =>this.addresses = res );
    this.orderForm.addressId = this.user.addresses[0]._id;
    this.fullAddress = this.user.addresses[0];
  }

  placeOrder(){
    this.orderForm.itemId = this.item.item._id;
    this.orderForm.userId = this.user._id;
    this.userService.createOrder(this.orderForm).subscribe(res => {
      this.userService.changeCartNumber(false);
      this.ref.close("hiiiii");
    })
  }

  set address(adress){
    if(adress){
      this.showPrevious = false;
      this.fullAddress = adress.addressString;
      this.orderForm.addressId = adress._id;
    }else{
      this.orderForm.userId = this.user._id;
      this.showPrevious = true;
    }
    this._address = adress;
  }
  get address(){
   return this._address;
  }
}
