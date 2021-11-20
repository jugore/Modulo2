const Player = require("../models/players")
const express = require("express")
const router = new express.Router()

router.post("/players/register", async (req, res) => {
    try {
        const request = req.body
        const player = await Player.create({
            name: request.name,
            password: request.password
        }).catch(error =>{
            console.log(error)
            throw new Error ("Existing user")
        })

        await player.hashPassword()
        await player.save()
        const token = player.generateToken()
        res.status(200).send({ data: { token }, status: true, message: "Registro exitoso" })
    }catch(error){
        console.log(error)
        res.status(200).send({ data: {error:error.toString()}, status: false, message: "Error" })
    }
})

router.post("/players/login",async(req, res) => {
    try {
        const request = req.body
        const player = await Player.findOne({
            name:request.name
        }).catch(error =>{
            console.log(error)
            throw new Error ("User not found")
        })
        if(player==null){
            throw new Error("No se encontro el usuario")
        }    
        const match=await player.verifyPassword(request.password)
        if(match==false){
            throw new Error("La contraseña es incorrecta")
        }
        const token=player.generateToken()
        res.status(200).send({ data: { token }, status: true, message: "Ingreso de usuario exitoso" })
    }catch(error){
        console.log(error)
        res.status(200).send({ data: {error:error.toString()}, status: false, message: "Error" })
    }
})
module.exports = router