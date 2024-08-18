const express=require("express")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//app.use("/api/v1",require("./routes"))

app.get("/",(req,res)=>{
    res.status(200).json({message:"Server Is Healthy",pid:process.pid,uptime:process.uptime()})
})

module.exports=app