const express = require("express")
const connectDB = require("./config/db")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const dotenv =require("dotenv")
const cors = require("cors")

dotenv.config()
const userRoutes = require("./routes/userRoutes")
const studentRoutes = require("./routes/studentRoutes")
const attendenceRoutes =require("./routes/attendenceRoutes")
const courseRoutes = require("./routes/courseRoutes")

connectDB()

const app=express()
app.use(express.json())
app.use(cors())



app.get("/test",(req,res)=>{
    res.send("This is SwiftCart Project")
})

app.use("/api/user",userRoutes)
app.use("/api/student",studentRoutes)
app.use("/api/attendence",attendenceRoutes)
app.use("/api/course",courseRoutes)

//error handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8181
app.listen(PORT,()=>console.log("listening at port"+PORT))