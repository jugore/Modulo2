const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User =require("../../models/user")

async function registerUser(email,nickname,imageUrl,password){
    try{
        const hashedPassword= await hashPassword(password)
        const token = createToken(email,nickname)
        const user= await User.create({
            email,
            nickname,
            imageUrl,
            password:hashedPassword,
            token
        }).catch((error)=>{
            console.log("Error",error)
            throw new Error('User already exists')
        })
    
        return {email,nickname,token}
    }catch(error){
        throw new Error('Enter valid information')
    }
}

async function loginUser(email,password){
    
    const user = await User.findOne({email}).catch((error)=>{
        console.log("Login Failed",error)
        throw new Error("User not found")
    })
    if(user==null){
        throw new Error("User not found")
    }
    console.log(user)
    
    const match = await verifyPassword(password,user.password)
    if(match===false){
        throw new Error("Incorrect Password")
    }
    const token = createToken(email,user.nickname)
    user.token=token
    await user.save().catch((error)=>{
        throw new Error("Save new token failed")
    })
    console.log("DATA!!!!!!!! "+user.imageUrl)
    return {email,nickname:user.nickname,token,imageUrl:user.imageUrl}

}

async function hashPassword(password){
    return await bcrypt.hash(password,5)
}

function createToken(email,nickname){
    const token = jwt.sign({email,nickname},process.env.AUTH_PASSWORD)
    return token
}

async function verifyPassword(password,inputpassword){
    return await bcrypt.compare(password,inputpassword)
    
}
async function updateUser(email,imageUrl,password,newPassword){

    if(imageUrl !=null || newPassword !=null){
        const user = await User.findOne({email}).catch((error)=>{
            console.log("Login Failed",error)
            throw new Error("User not found")
        })
        if(user==null){
            throw new Error("User not found")
        }
        if(newPassword!=null){
            
            const passwordMatch = await verifyPassword(password,user.password)

            if(passwordMatch===false){
                throw new Error("Incorrect Password")
            }
            if(passwordMatch===false){
                throw new Error("Incorrect Password")
            }
            const hashedPassword= await hashPassword(newPassword).catch((error)=>{throw new Error("Error",error)})
            user.password=hashedPassword
        }
        
        if(imageUrl!=null){
            user.imageUrl=imageUrl
        }
        
        user.save() 
    }else{
        throw new Error("Update failed")
    }
    return {imageUrl}
}

async function deleteUser(email,password){
    const user = await User.findOne({email}).catch((error)=>{
        console.log("Login Failed",error)
        throw new Error("User not found")
    })
    if(user==null){
        throw new Error("User not found")
    }

        
    const passwordMatch = await verifyPassword(password,user.password)

    if(passwordMatch===false){
        throw new Error("Incorrect Password")
    }
    user.remove().catch((error)=>{
        throw new Error("Delete Failed")
    })
    return
}

async function queryUser(nickname){
    const user = await User.findOne({nickname}).catch((error)=>{
        console.log("Login Failed",error)
        throw new Error("User not found")
    })
    if(user==null){
        throw new Error("User not found in the database")
    }
    return {email:user.email,nickname:user.nickname,imageUrl:user.imageUrl}

}
async function queryCompleteUser(nickname){
    const user = await User.findOne({nickname}).catch((error)=>{
        console.log("Login Failed",error)
        throw new Error("User not found")
    })
    if(user==null){
        throw new Error("User not found in the database")
    }
    return {email:user.email,nickname:user.nickname,imageUrl:user.imageUrl,password:user.password}

}

module.exports={registerUser,loginUser,updateUser,deleteUser,queryUser,queryCompleteUser,verifyPassword}   