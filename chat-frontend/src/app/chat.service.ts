import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response.model';
import { Chat } from './chat.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  groupMembers:User[]=[]
  groups:Chat[]=[]
  groupsByuser:string[]=[]
  httpClient:HttpClient
  constructor(httpClient:HttpClient) { 
    this.httpClient=httpClient
  }
  async registerMember(namegroup:any,email:any,nickname:any,imageUrl:any,token:any){
    const response = await this.registerInGroupRequest(namegroup,email,nickname,imageUrl,token)
    if(response.status==false){
      return false
    }
    return true
  }
  async registerInGroupRequest(namegroup:any,email:any,nickname:any,imageUrl:any,token:any){
    const data = await this.httpClient.patch("http://localhost:4001/chat/add-group-member",
    {
      name:namegroup,
      newMember:{
        email,
        nickname,
        imageUrl
      }
    },
      {
        headers:{
          email:email,
          "access-token":token,
          nickname:nickname
        }
        
      }).toPromise();
    const json = JSON.parse(JSON.stringify(data))
    console.log({status:json["status"],message:json["message"],data:json["data"]})
    return {status:json["status"],message:json["message"],data:json["data"]}
  }

  async getChatDataRequest(nameGroup:any,email:any,nickname:any,token:any){
    const data = await this.httpClient.get("http://localhost:4001/chat/"+nameGroup,{
        headers:{
          email:email,
          "access-token":token,
          nickname:nickname
        }
    }).toPromise()
    const json = JSON.parse(JSON.stringify(data))
    return {status:json["status"],message:json["message"],data:json["data"]}
  }

   async getChatData(nameGroup:any,email:any,nickname:any,token:any){
    const chatInfo = await this.getChatDataRequest(nameGroup,email,nickname,token)
    this.groupMembers=chatInfo.data.chat.users
  }

  async validategGroup(email:any,token:any,nickname:any){
    const response = await this.validateBelongGroupRequest(email,nickname,token);
    if(response.status==false){
      return []
    }
    const groupsChatsUser = response.data.group
    for (let index = 0; index < groupsChatsUser.length; index++) {
      this.groupsByuser[index]=groupsChatsUser[index].name
    }

    return this.groupsByuser
    
  }

  async validateBelongGroupRequest(email:any,nickname:any,token:any){
    
    const data = await this.httpClient.get("http://localhost:4001/chat/user/"+localStorage.getItem("nickname"),
    {
      headers:{
        email,
        "access-token":token,
        nickname
      }
    }
    ).toPromise();
    const json = JSON.parse(JSON.stringify(data))
    console.log({status:json["status"],message:json["message"],data:json["data"]})
    return {status:json["status"],message:json["message"],data:json["data"]}
  }
  async getAllChats(email:any,token:any,nickname:any){
    const chatsByUser= await this.validategGroup(email,token,nickname)
    const response = await this.getAllChatsRequest(email,token,nickname);
    console.log(response)
    const groupsChats = response.data.chats
    let belongs=false
    this.groups=[]
    for (let index = 0; index < groupsChats.length; index++) {

      for (let y = 0; y < chatsByUser.length; y++) {
        if(chatsByUser[y]==groupsChats[index].name){
          console.log("entro en: ",chatsByUser[y], groupsChats[index].name)
          belongs = true
          y=chatsByUser.length
        }else{
          belongs=false

        }
        
      }
      console.log("Belongs:",belongs)
      this.groups.push(new Chat(groupsChats[index].name,belongs))
      
    }
    console.log(this.groups,chatsByUser, groupsChats)
  }


  async getAllChatsRequest(email:any,token:any,nickname:any){
    const data = await this.httpClient.get("http://localhost:4001/chat/all-groups",
    {
      headers:{
        email,
        "access-token":token,
        nickname
      }
    }
    ).toPromise();
    const json = JSON.parse(JSON.stringify(data))
    console.log({status:json["status"],message:json["message"],data:json["data"]})
    return {status:json["status"],message:json["message"],data:json["data"]}
 
  }


}
