const { Post } = require("../../models/index")

const createPost = async (payload) => {
    const post = await new Post(payload).save()
    return post
}

const getPostByPostId = async (id) => {
    const post = await Post.findOne({ _id: id })
    return post
}

module.exports={createPost,getPostByPostId}