const express=require("express")
const cors=require("cors")
const CustomError = require("./utils/customError")
const errorHandler = require("./middlewares/error.middleware")

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api",require("./routes"))

app.get("/",(req,res)=>{
    res.status(200).json({message:"Server Is Healthy",pid:process.pid,uptime:process.uptime()})
})

app.all('*', (req, res, next) => {
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(errorHandler)

module.exports=app