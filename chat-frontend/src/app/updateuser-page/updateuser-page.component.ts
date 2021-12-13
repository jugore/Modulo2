import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-updateuser-page',
  templateUrl: './updateuser-page.component.html',
  styleUrls: ['./updateuser-page.component.css']
})
export class UpdateuserPageComponent implements OnInit {
  router:Router
  userService:UserService;
  userlocal=localStorage.getItem("nickname")
  emaillocal=localStorage.getItem("email")
  tokenlocal=localStorage.getItem("token")
  password=""
  newPassword=""
  newPassword2=""
  newImage=""
  imageUrl:any=""
  constructor(userService:UserService,router:Router, ) {
    this.userService=userService
    this.router=router
  }

  ngOnInit(): void {
    this.imageUrl=localStorage.getItem("imageUrl")
  }


  async updatePassword(){
    if(this.newPassword!=this.newPassword2){
      alert("Contraseñas no coinciden")
    }
    const data = await this.userService.updateDataUser(this.emaillocal,this.tokenlocal,this.userlocal,this.password,this.newPassword)
    console.log(data.status)
    if(data.status==false){
      alert("Contraseña incorrecta")
    }
    if(data.status==true){
      alert("Contraseña actualizada con exito")
      this.signOut()
    }
  }
  async updateImage(){
    if(this.newPassword!=this.newPassword2){
      alert("Contraseñas no coinciden")
    }
    const data = await this.userService.updateDataImageUser(this.emaillocal,this.tokenlocal,this.userlocal,this.newImage)
    console.log(data.status)
    if(data.status==false){
      alert("Contraseña incorrecta")
    }
    if(data.status==true){
      alert("Imagen actualizada con exito")
      this.router.navigateByUrl("/update-user")
      this.imageUrl=localStorage.getItem("imageUrl")
      location.reload()

    }
  }
  signOut():void{
    this.userService.signOut();
    this.router.navigateByUrl("/login")
  }
  comeBack(){
    this.router.navigateByUrl("/main")
  }


}
