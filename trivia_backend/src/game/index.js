const express = require("express")//Cargar libreria
const { getSingleTriviaQuestions, verifyAnswer, updatePlayerScore } = require("./utils")
const router = new express.Router()
const verifyToken = require("../middleware/auth")

router.get("/questions/single", verifyToken, async (req, res) => {
    try{
    const question = await getSingleTriviaQuestions()
    res.status(200).send({ data: { question }, status: true, message: "Consulta exitosa" })
    }catch(error){
        res.status(500).send({ data: {  }, status: false, message: "Error en la consulta" })
    }
})

router.post("/questions/response", verifyToken,async(req, res) => {
    try {
        const request = req.body
        const winner = await verifyAnswer(request.question, request.answer)
        const score = updatePlayerScore(req.headers["user"], winner)
        res.status(200).send({ data: { score }, status: true, message: "Respuesta recibida" })
    } catch (error) {
        console.log("error",error)
        res.status(500).send({data:{error:error.toString()},status:false,message:"Hubo un error"})
    }
})

module.exports = router