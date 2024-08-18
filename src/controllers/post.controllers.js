const postContext=require("../db/context/post.context")
const CustomError = require("../utils/customError")
const isValidData = require("../utils/dataValidator")
const createPostController = async (req, res, next) => {
    const {title,content}=req.body
    try {
        const validation = isValidData(req.body, ["title", "content"])
        if (validation !== true) {
            const err = new CustomError(validation, 400) 
            next(err)
        }
        const postObj = {
            title,
            content,
            userId:req.userId
        }
        const newPost = await postContext.createPost(postObj)
        return res.status(201).json({msg:"Post Created Successfully",newPost})
    } catch (error) {
        const err = new CustomError(`Internal Server Error:- ${error.message}`, 500)
        next(err)
    }
}

module.exports={createPostController}