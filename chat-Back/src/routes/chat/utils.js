const Chat =require("../../models/chat")
const { v4 } = require('uuid')
const moment = require ("moment")
const User =require("../../models/user")
const { queryUser,verifyPassword,queryCompleteUser } = require("../user/utils")


async function createGroup(name,adminNickname,adminUser,initialMessage){

    const chat= await Chat.create({
        name,
        adminNickname,
        users:[
            adminUser
        ],
        messages:[
            {
                id:v4(),
                sender:adminUser,
                date:moment().unix(),
                body:initialMessage
            }
        ]
    }).catch((error)=>{
        console.log("Error",error)
        throw new Error('Register Failed')
    })
    return {name:chat.name,adminNickname:chat.adminNickname,users:chat.users,messages:chat.messages}
}

async function addGroupMember(name,newMember){
    const queriedUser = await queryUser(newMember.nickname)

    const chatGroup= await Chat.findOne({
        name:name,
    }).catch((error)=>{
        console.log("Error",error)
        throw new Error('Group not found')
    })

    if(chatGroup==null){
        throw new Error('Error Group not found')
    }
    if(newMember==null){
        throw new Error('data empty')
    }
    if(queriedUser==null){
        throw new Error('user not exists')
    }
    const exists = chatGroup.users.find(
        item=>item.email===newMember.email || item.nickname === newMember.nickname
    )
    if(exists !=null){
        throw new Error('existing user in the chat')
    }
    chatGroup.users=[...chatGroup.users,newMember]
    await chatGroup.save()
    return { users:chatGroup.users}
}

//eliminar grupo
async function deleteGroupMember(name,adminNickname,adminPassword){
    const chatGroup= await Chat.findOne({
        name:name,
    }).catch((error)=>{
        console.log("Error",error)
        throw new Error('Group not found')
    })
    const queriedUser = await queryCompleteUser(adminNickname)
    if(queriedUser==null){
        throw new Error('user not exists')
    }
    if(chatGroup.adminNickname!=adminNickname){
        throw new Error('the user is not admin')
    }
    const passwordMatch = await verifyPassword(adminPassword,queriedUser.password) 
    if(passwordMatch==false){
        throw new Error('Incorrect password')
    }
    chatGroup.remove().catch((error)=>{
        console.log("Error",error)
        throw new Error('Elimination failed')
    })
}

//
async function sendMessage(name,sender,body){
    const chatGroup= await Chat.findOne({
        name,
    }).catch((error)=>{
        console.log("Error",error)
        throw new Error('Group not found')
    })


}

async function queryChatGroup(name){
    const chatGroup= await Chat.findOne({
        name,
    }).catch((error)=>{
        console.log("Error",error)
        throw new Error('Group not found')
    })
    if(chatGroup==null){
        throw new Error('Group not exists')
    }
    return{
        name:chatGroup.name,
        adminNickname: chatGroup.adminNickname,
        users:chatGroup.users,
        messages:chatGroup.messages
    }


}

async function queryAllChatGroups(){
    const chatGroup= await Chat.find({}).select("name").catch((error)=>{
        console.log("Error",error)
        throw new Error('Groups not found')
    })
    if(chatGroup==null || chatGroup.length <=0 ){
        throw new Error('groups not found')
    }
    return chatGroup
    
}
async function GroupsByNickname(userNickname){
    const chatGroup= await Chat.find({users:{nickname:userNickname}}).select("name").catch((error)=>{
        console.log("Error",error)
        throw new Error('Groups not found by user')
    })
    if(chatGroup==null || chatGroup.length <=0){
        throw new Error('groups not exists')
    }
    return chatGroup
    
}

module.exports={createGroup,addGroupMember,deleteGroupMember,sendMessage,queryChatGroup,queryAllChatGroups,GroupsByNickname} 