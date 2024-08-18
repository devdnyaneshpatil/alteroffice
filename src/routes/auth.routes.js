const {  registerController, loginController } = require("../controllers/auth.controllers")

const authRouter = require("express").Router()

authRouter.post("/register", registerController)
authRouter.post("/login",loginController)

module.exports=authRouter