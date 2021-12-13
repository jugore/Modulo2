const jwt = require("jsonwebtoken")


function verifyToken(req,res,next){
    try{
        const token = req.headers["access-token"]
        const email = req.headers["email"]
        const nickname = req.headers["nickname"]
        if(email==null){
            throw new Error("you must send a email")
        }
        if(token==null){
            throw new Error("you must send a token")
        }
        if(nickname==null){
            throw new Error("you must send a nickname")
        }
        try{
            const auth=jwt.verify(token,process.env.AUTH_PASSWORD);
            if(auth.nickname!=nickname || auth.email!=email){
                throw new Error("The Token is not real")
            }
        }catch(error){
            throw new Error("Validation token error")
        }


        return next()//salta a la sifuiente funcion que contiene req y res
    }catch(error){
        return res.status(401).send(    {
            data:{error:error.toString()},
            status:false,
            message:"Authentication Error" 
        })
    }
}

module.exports = {verifyToken}