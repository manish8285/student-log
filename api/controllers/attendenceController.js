const asyncHandler = require("express-async-handler")
const Attendence = require("../models/attendence")

const addAttendence = asyncHandler(async(req,res)=>{
    const attendances = req.body;
    let count = 0;

try {
    for (const attendance of attendances) {
        const { student, course } = attendance;

        if (!student || !course) {
            continue
        }

        const existingAttendance = await Attendence.findOne({
            course,
            student,
            date: {
                $gte: new Date().setHours(0, 0, 0, 0),
                $lt: new Date(),
            },
        });

        if (existingAttendance) {
            continue
        }

        const newAttendance = await Attendence.create({
            course,
            student,
            date: new Date(),
            status: "Present",
        });
        count++
    }

    return res.status(201).json({ message: `${count} Attendance recorded successfully` });
} catch (error) {
    console.error("Error while recording attendance:", error);
    return res.status(500).json({ error: "Internal server error" });
}

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
    const attendences = await Attendence.find({date:{$gte:startDate,$lt:endDate}}).populate("course").populate("student")
    res.status(200)
    res.json(attendences)
})

module.exports = {addAttendence,updateAttendence,deleteAttendence,getAttendence}