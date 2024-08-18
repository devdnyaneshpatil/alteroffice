const { Post } = require("../../models/index")

const createPost = async (payload) => {
    const post = new Post(payload).save()
    return post
}

module.exports={createPost}