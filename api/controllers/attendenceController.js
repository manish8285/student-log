const asyncHandler = require("express-async-handler")
const Attendence = require("../models/attendence")

const addAttendence = asyncHandler(async(req,res)=>{
    const {student,course} = req.body
    if(!student || !course){
        res.status(400)
            throw new Error("All fileds are required")  
    }
    const present = await Attendence.findOne({course,student,date:{
        $gte: new Date().setHours(0,0,0,0),
        $lt:new Date()
    }})
    let attendence;
    if(!present){
        attendence = await Attendence.create({
            course:course,
            student:student,
            date: new Date(),
            status:"Present"
        })
    }else{
        res.status(401)
        throw new Error("Attendence already marked")
    }

    

    res.status(201)
    res.json(attendence)
})

const updateAttendence = asyncHandler(async(req,res)=>{
    const {_id,status} = req.body
    if(!status){
        res.status(400)
            throw new Error("All fileds are required")
        
    }
    const attendence = await Attendence.findByIdAndUpdate(_id,{status})

    res.status(201)
    res.json(attendence)
})

const deleteAttendence = asyncHandler(async(req,res)=>{
    const id = req.params.id
    if(!id){
        res.status(400)
            throw new Error("All fileds are required")
        
    }
    const attendence = await Attendence.deleteOne({_id:id})

    res.status(201)
    res.send("Deleted Successfully")
})

const getAttendence = asyncHandler(async(req,res)=>{
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    let date = req.query.date
    const course = req.query.course
    if(!date && !course && !regex.test(date)){
        res.status(401)
        throw new Error("Date is required")
    }
    date = new Date(date)
    const startDate = new Date(date)
    startDate.setHours(0,0,0,0)
    const endDate = new Date(date)
    endDate.setHours(23,59,59,999)
    const attendences = await Attendence.find({date:{$gte:startDate,$lt:endDate}})
    res.status(200)
    res.json(attendences)
})

module.exports = {addAttendence,updateAttendence,deleteAttendence,getAttendence}