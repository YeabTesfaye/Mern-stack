const jwt = require('jsonwebtoken')
const becrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
//@desc register user
//@route POST /api/users
//@ access public
const registerUser = asyncHandler(async(req,res) => {
    const {name,email, password} = req.body
    if(!name || !email || !password){
        res.status(404)
        throw new Error('please Add all fileds')
    }

    // check if user existed 
    const userExist = await User.findOne({email})
    if(userExist){
       return res.status(404).json({
            msg : 'User Is Already Existed !!'
        })
    }

    // hasedpassword
    const salt = await becrypt.genSalt(10)
    const hasedPassword  = await becrypt.hash(password, salt)
    
   // creating user 
    const user  = await User.create({
        name : name,
        email : email,
        password : hasedPassword,

    })

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            password : user.password,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(404).json({
            msg : 'Invalid user Data'
        })
    }
})


//@desc Authenticate user
//@route POST /api/users/login
//@ access public
const loginUser = asyncHandler( async(req,res) => {
    const {email,password,name} = req.body

    const user = await User.findOne({email})

    if(user && (await becrypt.compare(password, user.password))){
        res.status(200).json({
            id : user._id,
            name : user.name,
            password : user.password,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(404)
        throw new Error('Auth Failed ')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const {_id , name , email} = await User.findById(req.user.id)
    res.status(200).json({
        
    })
  })

// Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '12d'
    })
}

module.exports = {
    registerUser,
    getMe,
    loginUser
}