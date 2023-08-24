const asyncHandler = require("express-async-handler")
const Student  = require("../models/student")


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
    let rstudent = await Student.update(student)
    res.status(201)
    res.json(rstudent)
})

const getAllStudents = asyncHandler(async(req,res)=>{
    let rstudent = await Student.find({})
    res.status(201)
    res.json(rstudent)
})

const getAllStudentsByCourse = asyncHandler(async(req,res)=>{
    const course_id= req.params.course_id
    if(!course_id){
        res.status(401)
        throw new Error("Course Id required")
    }
    let rstudent = await Student.find({course:course_id})
    res.status(201)
    res.json(rstudent)
})





module.exports = {addStudent, updateStudent,getAllStudents, getAllStudentsByCourse}