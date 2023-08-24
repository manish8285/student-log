const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../config/generateToken")


const getAllUsers = asyncHandler(async(req,res)=>{
    let users = await User.find({})
    res.status(201)
    res.json(users)
})

// const updateUser = asyncHandler(async(req,res)=>{

//     if(!req.body.name || !req.body.)

//     let user = req.user
//     user.name=
// })

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter All the fields")
    }
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if(user){
        console.log("user id : "+user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
            throw new Error("User not found");
    }


    res.send("register user")
})

const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("All fields are required")
    }

    const user = await User.findOne({email});
    if(!user){
        throw new Error("User does not exists")
    }
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)

        })
    }else{
        res.status(401)
        throw new Error("Invalid Email or Password")
    }

})


module.exports = {registerUser,authUser,getAllUsers}