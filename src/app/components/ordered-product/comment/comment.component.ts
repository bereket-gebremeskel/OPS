import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comment:string;
  productId: string;
  userId:string;
  constructor(public ref: DynamicDialogRef,public config: DynamicDialogConfig,private userService:UserService) { }

  ngOnInit() {
    this.productId = this.config?.data?.item?.product?._id;
   this.userId= this.userService.currentUser()?._id;
  }

  addComment(){
    this.userService.comment({"productId":this.productId,"userId":this.userId,"text":this.comment}).subscribe(res => {
      this.ref.close("h");
    })
   
  }
}
