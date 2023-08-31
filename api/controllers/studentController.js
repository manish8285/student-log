const asyncHandler = require("express-async-handler")
const Student  = require("../models/student")
const Course  = require("../models/course")

const addStudent= asyncHandler(async(req,res)=>{
    let student = req.body
    if(!student.name || !student.class || !student.course){
        res.status(401)
        throw new Error("All fields are required")
    }
    let rstudent = await Student.create(student)
    res.status(201)
    res.json(rstudent)
})

const updateStudent = asyncHandler(async(req,res)=>{
    let student = req.body
    if(!student.name || !student.class || !student.course){
        res.status(401)
        throw new Error("All fields are required")
    }
    let rstudent = await Student.updateOne({_id:student._id},{
        $set:{name:student.name,class:student.class}
    })
    res.status(201)
    res.json(rstudent)
})

const getAllStudents = asyncHandler(async(req,res)=>{
    try{
    let rstudent = await Student.find({}).populate("course").exec();
    res.status(200)
    res.json(rstudent)
    }catch(error){
        console.log(error)
        res.status(500)
    }
})

const deleteStudent = asyncHandler(async(req,res)=>{
    let id = req.params.id
    try{
    let rstudent = await Student.deleteOne({_id:id})
    res.status(200)
    res.send("Student Deleted Successfully")
    }catch(error){
        console.log(error)
        res.status(500)
    }
})



const getAllStudentsByCourse = asyncHandler(async(req,res)=>{
    const course_id= req.params.course_id
    if(!course_id){
        res.status(401)
        throw new Error("Course Id required")
    }
    let rstudent = await Student.find({course:course_id}).populate("course")
    res.status(201)
    res.json(rstudent)
})





module.exports = {addStudent, updateStudent,getAllStudents, getAllStudentsByCourse, deleteStudent}