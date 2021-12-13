import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard-chat',
  templateUrl: './dashboard-chat.component.html',
  styleUrls: ['./dashboard-chat.component.css']
})
export class DashboardChatComponent implements OnInit {
  chatName:any=""
  userService:UserService
  router:Router
  chatService:ChatService
  constructor(router:Router,userService:UserService,chatService:ChatService) { 
    this.router=router
    this.userService=userService
    this.chatService=chatService
  }

  ngOnInit(): void {
    this.chatName=localStorage.getItem("groupName")
    this.chatService.getChatData(localStorage.getItem("groupName"),localStorage.getItem("email"),localStorage.getItem("nickname"),localStorage.getItem("token"))
    console.log(this.checkImage("https://firebasestorage.googleapis.com/v0/b/chatapp-df8a1.appspot.com/o/New%20Project%202.jpg?alt=media&token=7e7680bd-1c29-427a-aaef-e4ff0514dafa", function(){ return true }, function(){ alert("falso") } ))
  }

  checkImage(imageSrc:any, good:any, bad:any) {
    var img = new Image();
    img.oninvalid
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
    
}

  
  goToUpdateUser(){
    this.router.navigateByUrl("/update-user")
  }

  signOut():void{
    this.userService.signOut();
    this.router.navigateByUrl("/main")
  }

}
