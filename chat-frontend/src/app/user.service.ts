import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  nickName: string = "";
  email: string="";
  token: string = "";
  userPassword: string = ""
  imageUrl:string=""
  httpClient:HttpClient
  constructor(httpClient:HttpClient) { 
    this.httpClient=httpClient
  }

  async createUserName(email:string,name:string,password:string):Promise<boolean>{
    try{
      const registerResponse:ApiResponse = await this.createRegisterRequest(email,name,password)
      if(registerResponse.status==false){
        alert("Fallo al registrarse o usuario existente: " + registerResponse.message.toString())
        /**const loginResponse:ApiResponse = await this.loginRegisterRequest(email,password)
        if(loginResponse.status==true){
          localStorage.setItem("email",email)
          localStorage.setItem("token",loginResponse.data.token)
          this.nickName=name
          this.token=loginResponse.data.token
          return true;
        }**/
        return false;
      }
      localStorage.setItem("nickname",registerResponse.data.nickname)
      localStorage.setItem("email",email)
      localStorage.setItem("imageUrl",registerResponse.data.imageUrl)
      localStorage.setItem("token",registerResponse.data.token)
      this.email=email
      this.token=registerResponse.data.token
      this.imageUrl=registerResponse.data.imageUrl
      return true;
    }catch(error){
      return false
    }
  }
  async loginUserName(email:string,password:string):Promise<boolean>{
    try{
      const loginResponse:ApiResponse = await this.loginRegisterRequest(email,password)
      if(loginResponse.status==false){
        return false;
      }
      localStorage.setItem("nickname",loginResponse.data.nickname)
      localStorage.setItem("email",email)
      localStorage.setItem("token",loginResponse.data.token)
      localStorage.setItem("imageUrl",loginResponse.data.imageUrl)
      this.nickName=loginResponse.data.nickname
      alert("hola:" +loginResponse.data.nickname)
      this.email=email
      this.token=loginResponse.data.token
      this.imageUrl=loginResponse.data.imageUrl
      return true;
    }catch(error){
      return false
    }
  }

  async createRegisterRequest(email:string,nickname: string,password:string):Promise<ApiResponse>{
    const data = await this.httpClient.post("http://localhost:4001/user/register",{email,nickname,password}).toPromise();
    const json = JSON.parse(JSON.stringify(data))
    console.log({status:json["status"],message:json["message"],data:json["data"]})
    return {status:json["status"],message:json["message"],data:json["data"]}
    
  }
  async loginRegisterRequest(email: string,password:string):Promise<ApiResponse>{
    const data = await this.httpClient.post("http://localhost:4001/user/login",{email,password}).toPromise();
    console.log(data)
    const json = JSON.parse(JSON.stringify(data))
    return {status:json["status"],message:json["message"],data:json["data"]}
  }
  
  async updateDataUser(email:any,token:any,nickname:any,password:string,newPassword:string){
    const data = await this.httpClient.patch(
      'http://localhost:4001/user/update',
      {
        password,
        newPassword
      },
      {
        headers:{
          email:email,
          "access-token":token,
          nickname:nickname
        }
      }).toPromise()
      
      const json = JSON.parse(JSON.stringify(data))

      return {status:json["status"],message:json["message"],data:json["data"]}
      
  }

  async updateDataImageUser(email:any,token:any,nickname:any,imageUrl:string){
    const data = await this.httpClient.patch(
      'http://localhost:4001/user/update',
      {
        imageUrl,
      },
      {
        headers:{
          email:email,
          "access-token":token,
          nickname:nickname
        }
      }).toPromise()
      
      const json = JSON.parse(JSON.stringify(data))
      localStorage.setItem("imageUrl",imageUrl)
      return {status:json["status"],message:json["message"],data:json["data"]}
      
  }

  checkLoginUser():boolean {
    const userEmail = localStorage.getItem("email")
    const token = localStorage.getItem("token")
    if(userEmail!=null && token!=null){
      this.token=token
      this.email=userEmail
      return true;
    }
    return false;
  }
  
  isLoggedIn(){
    const userEmail = localStorage.getItem("nickname")
    if (userEmail != null) {
      this.email=userEmail
      return true
    }
    return false
  }

  signOut(){
    localStorage.removeItem("nickname")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    this.email=""
    this.nickName=""
    this.token=""
  }


}
