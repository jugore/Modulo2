const express = require('express')
const { verifyToken } = require('../../middleware/auth')
const router = new express.Router()
const { registerUser,loginUser,updateUser,deleteUser,queryUser} = require('./utils')

router.post("/user/register", async(req,res)=>{
    try{
        const request= req.body
        const user= await registerUser(request.email,request.nickname,request.imageUrl,request.password)
        res.status(200).send(
            {
                status:true,
                message:"Register Done",
                data:{
                    email:user.email,
                    nickname:user.nickname,
                    token:user.token
                }
            }
        )
    }catch(error){
        res.status(200).send(
            {
                status:false,
                message:"Register Failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }

})

router.post("/user/login", async(req,res)=>{
    try{
        const request = req.body
        const userLogin = await loginUser(request.email,request.password)
        console.log(userLogin)
        res.status(200).send(
            {
                status:true,
                message:"Login Done",
                data:{
                    email:userLogin.email,
                    nickname:userLogin.nickname,
                    token:userLogin.token,
                    imageUrl:userLogin.imageUrl
                }
            }
        )
    }catch(error){
        console.log(error)
        res.status(200).send(    {
            data:{error:error.toString()},
            status:false,
            message:"Error" 
        })
    }
})

router.patch("/user/update",verifyToken, async (req, res) => {
    try {
        const request = req.body

        const updatedUser = await updateUser(
            req.headers["email"],
            request.imageUrl,
            request.password,
            request.newPassword
        )
        res.status(200).send({
            status: true,
            message: "Usuario actualizado con éxito",
            data: {
                imageUrl: updatedUser.imageUrl
            }
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(200).send({
            status: false,
            message: "Actualización falló",
            data: { error: error.toString() }
        })
    }
})
router.delete("/user/delete",verifyToken, async (req, res) => {
    try {
        const request = req.body

        await deleteUser(
            req.headers["email"],
            request.password,

        )
        res.status(200).send({
            status: true,
            message: "Usuario actualizado con éxito",
            data: {
                message: "User deleted"
            }
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Delete failed",
            data: { error: error.toString() }
        })
    }
})

router.get("/user/:userNickname",verifyToken,async (req, res) =>{
    try {
        const request = req.body
        const params = req.params
        const user = await queryUser(
            params.userNickname

        )
        res.status(200).send({
            status: true,
            message: "Usuario obtenido con éxito",
            data: {user}
        })
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).send({
            status: false,
            message: "Get failed",
            data: { error: error.toString() }
        })
    }
})
module.exports=router