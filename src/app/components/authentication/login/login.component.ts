import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any={};
  erromsg : string;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.user).subscribe(res => {
      if(res){
        window.localStorage.setItem("token",res);
        this.authService.getCurrentUserApi().subscribe(u => {
          if(u){
            window.localStorage.setItem("userData", JSON.stringify(u));
            this.router.navigate(['/product'])
          }
        })
       
        this.erromsg = '';
        
      }else{
       this.erromsg ="invalid email or password!"
      }
    },err => {
      this.erromsg ="invalid email or password!"
    })
  }
}
