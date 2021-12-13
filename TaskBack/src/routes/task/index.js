const express = require('express')
const router = new express.Router()
const {addTask,getAllTasks,deleteTask} = require('./utils')

router.post("/task/add",async(req,res)=>{
    try{
        const request= req.body
        const task= await addTask(request.taskdescription)
        res.status(200).send(
            {
                status:true,
                message:"Register Done",
                data:{
                    taskdescription:task.taskdescription,
                }
            }
        )

    }catch(error){
        res.status(200).send(
            {
                status:false,
                message:"add Failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }
})

router.get("/task/alltasks",async(req,res)=>{
    try{
        const tasks= await getAllTasks()
        res.status(200).send(
            {
                status:true,
                message:"Get tasks Done",
                data:{
                    tasks:tasks
                }
            }
        )
    }catch(error){
        res.status(200).send(
            {
                status:false,
                message:"get Failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }
})

router.delete("/task/delete-task",async(req,res)=>{
    try{
        const request = req.body
        await deleteTask(request._id)
        res.status(200).send(
            {
                status:true,
                message:"Delete Done",
                data:{
                    message:"Delete Done"
                }
            }
        )
    }catch(error){
        res.status(200).send(
            {
                status:false,
                message:"get Failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }
})
module.exports=router