import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  statuses:any[]=[{name:'ACTIVE'},{name:'INACTIVE'}]
  status:string;
  constructor(private userService:UserService) { }

  ngOnInit() {
   this.load()
  }
load(){
  this.userService.getAllUsers().subscribe(res => {
    this.users = res;
  })
}
  change(id,status){
    this.userService.changeStatus({'userStatus':status,'userId':id}).subscribe(res => {
      this.load();
    })
  }
}
