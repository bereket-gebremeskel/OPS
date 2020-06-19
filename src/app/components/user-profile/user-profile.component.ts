import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from 'src/app/services/address.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userForm:FormGroup;
  addresses: any[];
  user:any={};
  constructor(private fb:FormBuilder,private userService:UserService,private addressService:AddressService) {
    let u = this.userService.currentUser();
    this.userService.getUserById(u._id).subscribe(res => {
     this.user = res;
     console.log("this.userssssss",this.user.firstName)
     
     this.userForm = this.fb.group({
       _id:[this.user?._id],
       firstName:[this.user?.firstName],
       lastName:[this.user?.lastName],
       phoneNumber:[this.user.phoneNumber],
       email:[this.user.email],
       nameOntheCard:[this.user.billingInformation.nameOntheCard],
       accountNumber:[this.user.billingInformation.accountNumber],
       expiryDate:[this.user.billingInformation.expiryDate],
 
       state:[this.user?.billingInformation.state],
       city:[this.user.billingInformation.city],
       street:[this.user.billingInformation.street],
       zipCode:[this.user.billingInformation.zipCode],
 
       password:[this.user.password],
       ccv:[this.user.billingInformation.ccv],
       addressId:[this.user.addresses[0]._id],
       role:[this.user.role]
     })
    })
   }

  ngOnInit() {
    this.addressService.getAddresses().subscribe(res => {
      console.log("adsfasdfasdf",res)
      this.addresses = res
    });
  
  
  }
  save(){
this.userService.updateUser(this.userForm.value).subscribe(res =>res)
  }
}
