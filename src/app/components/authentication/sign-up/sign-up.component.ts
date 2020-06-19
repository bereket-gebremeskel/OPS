import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 

  user:User;
  userForm:FormGroup;
  addresses: any[];
  constructor(private fb:FormBuilder,private userService:UserService,private addressService:AddressService,private router:Router) { }

  ngOnInit() {
    this.addressService.getAddresses().subscribe(res => {
      console.log("adsfasdfasdf",res)
      this.addresses = res
    })
    this.userForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      phoneNumber:[''],
      email:[''],
      nameOntheCard:[''],
      accountNumber:[0],
      expiryDate:[''],

      state:['Iowa'],
      city:['Fairfield'],
      street:['1000 N 4th St.'],
      zipCode:['52557'],

      password:[''],
      ccv:[''],
      addressId:[''],
      role:['']
    })
    this.onValueChanges()
  }

  onValueChanges() {
    // this.userForm.get('addressId').valueChanges.subscribe(val => {
    //   console.log(val)
    //   this.userForm.patchValue({
    //     addressId:val
    //   });
    // });
  }

  save(){
    this.userService.createUser(this.userForm.value).subscribe(res =>{
      this.router.navigate(['/login'])
      if(res){
      
      }
    })
  }
  addressSelect(address){
    console.log("adres",address)
    this.userForm.patchValue({
      addressId:address._id
    });
  }
}
