const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    taskdescription:{
        type:String,
        required:true,
        trim:true
    }
})
const Task = mongoose.model("Task", taskSchema)
module.exports=Task