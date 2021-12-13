const mongoose = require("mongoose")



const chatSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    adminNickname:{
        type:String,
        required:true
    },
    users:[
        {
            email:{
                type:String,
                required:true,
                trim:true,
                lowercase:true,
                match:RegExp(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/)
            },
            nickname:{
                type:String,
                required:true,
                trim:true,
                maxlength:15
            },
            imageUrl:{
                type:String,
                trim:true,
            },
            
        }
    ],
    messages:[
        {
            id:{
                type:String,
                required:true,
                unique:true
            },
            sender:{
                    email:{
                        type:String,
                        required:true,
                        trim:true,
                        lowercase:true,
                        match:RegExp(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/)
                    },
                    nickname:{
                        type:String,
                        required:true,
                        trim:true,
                        maxlength:15
                    },
                    imageUrl:{
                        type:String,
                        trim:true,
                    },
            },
            date:{
                type:Number,
                required:true
            },
            body:{
                type:String,
                required:true,
                trim:true
            }
        }
    ]


})



const Chat = mongoose.model("Chat", chatSchema)
module.exports=Chat