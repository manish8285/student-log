const asyncHandler = require("express-async-handler")
const Course = require("../models/course")


const addCourse= asyncHandler(async(req,res)=>{
    const course = req.body
    if(!course.name){
        res.status(401)
        throw new Error("All fields are required")
    }
    const rcourse = await Course.create(course)
    res.status(201)
    res.json(rcourse)
})

const updateCourse= asyncHandler(async(req,res)=>{
    const course = req.body
    if(!course.name){
        res.status(401)
        throw new Error("All fields are required")
    }
    const rcourse = await Course.updateOne({_id:course._id},{$set:{name:course.name,time:course.time}})
    res.status(200)
    res.json(rcourse)
})

const deleteCourse= asyncHandler(async(req,res)=>{
    console.log(req.params)
    const course_id = req.params.id
    if(!course_id){
        res.status(401)
        throw new Error("All fields are required")
    }
    const rcourse = await Course.deleteOne({_id:course_id})
    res.status(200)
    res.send("Course deleted Successfully")
})

const getAllCourses= asyncHandler(async(req,res)=>{
    const courses = await Course.find({})
    res.status(200)
    res.json(courses)
})

module.exports = {addCourse,updateCourse,deleteCourse, getAllCourses}

