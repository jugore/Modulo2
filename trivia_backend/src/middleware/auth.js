const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try {
        const user = req.headers["user"]
        const token = req.headers["access_token"]
        if (user == null) {
            throw new Error("Debes enviar un usuario")
        }
        if (token == null) {
            throw new Error("Debes enviar un token")
        }
        const userName = jwt.verify(token, process.env.AUTHPASSWORD)
        console.log(userName)
        if (userName._id != user) {
            throw new Error("El token no es real")
        }
        return next()
    } catch (error) {
        return res.status(200).send({ data: {error:error.toString()}, status: false, message: "Error de autenticación"})
    }
}

module.exports=verifyToken