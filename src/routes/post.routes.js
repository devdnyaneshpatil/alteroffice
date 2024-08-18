const { createPostController } = require("../controllers/post.controllers")
const auth = require("../middlewares/auth.middleware")

const postRouter = require("express").Router()

postRouter.post("/create-post",auth,createPostController)

module.exports=postRouter