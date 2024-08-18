const { User }= require("../../models/index")

const getUserByUsername = async (userName) => {
    const user = await User.findOne({ userName })
    return user
}

const createNewUser = async (payload) => {
    const newUser = new User(payload).save()
    return newUser
}

module.exports={getUserByUsername,createNewUser}