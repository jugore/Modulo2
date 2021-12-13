import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  chatService:ChatService
  userService:UserService
  router:Router
  
  constructor(router:Router,chatService:ChatService,userService:UserService) {
    this.router=router
    this.chatService=chatService
    this.userService=userService
  }

  ngOnInit(): void {
     this.chatService.getAllChats(localStorage.getItem("email"),localStorage.getItem("token"),localStorage.getItem("nickname"))
  }

  goToUpdateUser(){
    this.router.navigateByUrl("/update-user")
  }

  signOut():void{
    this.userService.signOut();
    this.router.navigateByUrl("/login")
  }

  async RegisterInGroup(namegroup:string){
    const register = await this.chatService.registerMember(namegroup,localStorage.getItem("email"),localStorage.getItem("nickname"),localStorage.getItem("imageUrl"),localStorage.getItem("token"))
    if(register==true){
      localStorage.setItem("groupName",namegroup)
      this.router.navigateByUrl("/chat")
    }else{
      alert("No se ha podido unir al chat")
    }
  }
  GetintoGroup(name:string){
    alert("Ingresar"+name)
    localStorage.setItem("groupName",name)
    this.router.navigateByUrl("/chat")
  }

}
