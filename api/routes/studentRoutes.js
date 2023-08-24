const express =  require("express")
const { adminAuth } = require("../middleware/authMiddleware")
const {addStudent, updateStudent ,getAllStudents,getAllStudentsByCourse} = require("../controllers/studentController")

const router = express.Router()

router.post("/",adminAuth,addStudent)
router.put("/",adminAuth,updateStudent)
router.get("/",adminAuth,getAllStudents)
router.get("/course/:course_id",adminAuth,getAllStudentsByCourse)

module.exports = router
