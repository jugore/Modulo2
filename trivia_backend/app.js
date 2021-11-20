const express=require("express")//cargar libreria express
const app=express()//inicializar la app express
const port=4001//puerto inicializado
const cors=require("cors")//cargamos cors

require('dotenv').config()
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGODB_URL)
const playerRouter=require("./src/player")
const gameRouter=require("./src/game")
app.use(express.json())//que el servidor acepte peticiones JSON
app.use(cors())
app.use(gameRouter)
app.use(playerRouter)
app.listen(process.env.PORT || port,()=>{
    console.log("Servidor inciado en el puerto: ", port);
})


