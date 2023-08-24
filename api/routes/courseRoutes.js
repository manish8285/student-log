const express = require("express")
const { adminAuth } = require("../middleware/authMiddleware")
const {addCourse,updateCourse,deleteCourse,getAllCourses} = require("../controllers/courseController")

const router = express.Router()

router.get("/",adminAuth,getAllCourses)
router.post("/",adminAuth,addCourse)
router.put("/",updateCourse)
router.delete("/:id",adminAuth,deleteCourse)

module.exports = router