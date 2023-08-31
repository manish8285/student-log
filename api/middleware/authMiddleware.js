const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            //decoded token id
            const decoded =jwt.verify(token,process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password");
            next()

        }catch(error){
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token")
    }
})


const adminAuth = asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            //console.log(token)
            let decoded = jwt.verify(token,process.env.JWT_SECRET)

            let user = await User.findById(decoded.id)
            if(!user.isAdmin){
                res.status(401)
                throw new Error("Unauthorized Access")
            }
            req.user=user
            next()

        }catch(error){
            res.status(401)
            throw new Error("Not authorized , No token")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorized , no token")
    }
})


module.exports = {protect,adminAuth}