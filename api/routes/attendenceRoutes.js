const express = require("express")
const { adminAuth } = require("../middleware/authMiddleware")
const { addAttendence, updateAttendence, deleteAttendence,getAttendence } = require("../controllers/attendenceController")


const router = express.Router()
router.post("/",adminAuth,addAttendence)
router.patch("/",adminAuth,updateAttendence)
router.delete("/",adminAuth,deleteAttendence)
router.get("/",adminAuth,getAttendence)

module.exports = router