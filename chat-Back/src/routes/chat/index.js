const express = require('express')
const { verifyToken } = require('../../middleware/auth')
const router = new express.Router()
const { createGroup,addGroupMember,deleteGroupMember,sendMessage,queryChatGroup,queryAllChatGroups,GroupsByNickname} = require('./utils')
//crear grupo
router.post('/chat/create-group',verifyToken, async (req,res)=>{
    try{
        const request= req.body
        const group= await createGroup(
            request.name,
            request.adminNickname,
            request.adminUser,
            request.initialMessage
        )
        res.status(200).send(
            {
                status:true,
                message:"group creation Done",
                data:{
                    chat:group
                }
            }
        )
    }catch(error){
        res.status(500).send(
            {
                status:false,
                message:"group creation failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }     
})

//add participantes participants
router.patch('/chat/add-group-member',verifyToken, async (req,res)=>{
    try{
        const request= req.body
        const group= await addGroupMember(
            request.name,
            request.newMember
        )
        res.status(200).send(
            {
                status:true,
                message:"group member add Done",
                data:{
                    chat:group
                }
            }
        )
    }catch(error){
        res.status(500).send(
            {
                status:false,
                message:"group member add failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }     
})
//sen message
router.post('/chat/send-message',verifyToken,async (req,res)=>{
    try{
        const request= req.body
        const group= await deleteGroupMember(
            request.name,
            request.adminNickname,
            request.adminPassword
        )
        res.status(200).send(
            {
                status:true,
                message:"group delete Done",
                data:{
                }
            }
        )
    }catch(error){
        res.status(500).send(
            {
                status:false,
                message:"group delete failed",
                data:{
                    message:error.toString()
                }
            }
        )
    } 
})
//get all groups
router.get("/chat/all-groups",verifyToken,async(req,res)=>{
    try {

        const queriedChats = await queryAllChatGroups()

        res.status(200).send({
            status: true,
            message: "Grupo obtenido con éxito",
            data: {chats:queriedChats}
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Get Group failed",
            data: { error: error.toString() }
        })
    }
})

//delete one group
router.delete('/chat/delete-group',verifyToken, async (req,res)=>{
    try{
        const request= req.body
        const group= await deleteGroupMember(
            request.name,
            request.adminNickname,
            request.adminPassword
        )
        res.status(200).send(
            {
                status:true,
                message:"group delete Done",
                data:{
                }
            }
        )
    }catch(error){
        res.status(500).send(
            {
                status:false,
                message:"group delete failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }     
})

router.get('/chat/user/:userNickname',verifyToken, async(req,res)=>{
    try{

        const params = req.params
        const group= await GroupsByNickname(
            params.userNickname,
        )
        res.status(200).send(
            {
                status:true,
                message:"groups get by user Done",
                data:{
                }
            }
        )
    }catch(error){
        res.status(500).send(
            {
                status:false,
                message:"groups get by user  failed",
                data:{
                    message:error.toString()
                }
            }
        )
    } 
})
//get one
router.get("/chat/:chatName",verifyToken,async (req, res) =>{
    try {
        const request = req.body
        const params = req.params
        const queriedChat = await queryChatGroup(
            params.chatName

        )
        res.status(200).send({
            status: true,
            message: "Grupo obtenido con éxito",
            data: {chat:queriedChat}
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Get Group failed",
            data: { error: error.toString() }
        })
    }
})

module.exports=router