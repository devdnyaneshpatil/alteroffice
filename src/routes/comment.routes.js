const { createCommentController, replyToCommentController, getCommentsController, expandCommentsController } = require("../controllers/comment.controllers")
const auth = require("../middlewares/auth.middleware")
const limiter = require("../middlewares/limiter.middleware")

const commentRouter = require("express").Router()

commentRouter.use(auth)
commentRouter.use(limiter)

commentRouter.post("/:postId/comments", createCommentController)
commentRouter.post("/:postId/comments/:commentId/reply", replyToCommentController)
commentRouter.get("/:postId/comments", getCommentsController)
commentRouter.get("/:postId/comments/:commentId/expand",expandCommentsController)

module.exports=commentRouter