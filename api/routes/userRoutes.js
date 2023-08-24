const express = require("express")
const {registerUser, authUser, getAllUsers} = require("../controllers/userControllers")
const {adminAuth, protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.route("/").post(registerUser)
router.get("/",adminAuth,getAllUsers)
router.patch("/",protect,)
router.post("/login",authUser)

module.exports = router