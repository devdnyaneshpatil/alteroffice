const registerController = async (req, res,next) => {
    res.send("register route")
}

const loginController = async (req, res, next) => {
    res.send("login route")
}

module.exports={registerController,loginController}