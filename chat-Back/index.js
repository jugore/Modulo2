const express = require('express')
const app = express()
const cors = require("cors")
const userRouter = require("./src/routes/user")
const chatRouter = require("./src/routes/chat")
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL)

const port = process.env.PORT || 4001
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    next();
})
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(chatRouter)


app.listen(port,()=>{
    console.log("Server running on: " + port)
})

