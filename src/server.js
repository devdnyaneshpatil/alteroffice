require("dotenv").config()
require("./db").connectToMongo()
require("./models/index")
const http=require("http")
const app=require("./app")

const {PORT}=require("./config/constants")

const server=http.createServer(app)

server.listen(PORT,()=>{
    console.log("Server is Running on Port",PORT)
})