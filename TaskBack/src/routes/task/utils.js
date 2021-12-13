const Task = require("../../models/task")

async function addTask(taskdescription){
    try {
        const task = await Task.create({
            taskdescription:taskdescription
        }).catch((error)=>{
            console.log("Error",error)
            throw new Error('Insertion failed')
        })
    } catch (error) {
        throw new Error('Enter valid information')
    }
    return {taskdescription}
}


async function getAllTasks(){
    try {
        const task = await Task.find({}).catch((error)=>{
            throw new Error('get tasks failed')
        })
        if(task==null || task.length <=0 ){
            throw new Error('tasks not found')
        }
        return task
    } catch (error) {
        throw new Error('get tasks failed')
    }

}

async function deleteTask(taskId){

    try {
        const task = await Task.findOne({_id:taskId}).catch((error)=>{
            throw new Error('task not found')
        })
        if(task==null || task.length <=0 ){
            throw new Error('tasks not found')
        }

        task.remove().catch((error)=>{
            throw new Error('task not eliminated' + error)
        })
        return true
    } catch (error) {
        throw new Error('get tasks failed')
    }
}

module.exports={addTask,getAllTasks,deleteTask} 