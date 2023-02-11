const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModlel')
const User = require('../models/userModel')
// @desc get Goals
// @route GET /api/goals
// @access public
const getGaols  = asyncHandler( async (req,res) => {
    const goals =  await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @des set Goals
// @route POST /api/gaols
// @access private
const setGoals = asyncHandler( async(req,res) => {
    if(!req.body.text){
        res.status(404)
        throw new Error('plase add a text filed')
    }
    const goal = await  Goal.create({
        text : req.body.text,
        user: req.user.id
    })
    res.status(201).json(goal)
})

// @des update goals
// @route PATCH /api/gaols/:id
// @acess private
const updateGoals = asyncHandler(async(req,res) => {
    const {id} = req.params
    const goal  = await Goal.findById(id)

    if(!goal){
        throw new Error('goal not found')
    }

    const user = await User.findById(req.user.id)
   
    if(!user){
        res.status(401)
        throw new Error('No user')
    }

    // make sure that the loged user is trying to update goals

    if(goal.user.toString() !== user.id ){
        res.status(401)
        throw new Error('user Not Authorized')
    }

    const updatedGaol = await Goal.findByIdAndUpdate(id,req.body, {new : true} )
    res.status(200).json(updatedGaol)
})

// @des delete Goals
// @route DELETE /api/goals/:id
// @access private
const delteGoals = asyncHandler( async (req,res) =>{
    const {id} = req.params
    const goal = await Goal.findById(id)

    if(!goal){
        res.status(404)
        throw new Error('Goal is not found')
    }
     
    // find user 
    const user = await User.findById(req.user.id)
   
    if(!user){
        res.status(401)
        throw new Error('No user')
    }

    // make sure that the loged user is trying to delete goals

    if(goal.user.toString() !== user.id ){
        res.status(401)
        throw new Error('user Not Authorized')
    }

    await goal.remove()
    res.status(200).json({
        id : req.params.id
    })
})



module.exports = {
    getGaols,
    setGoals,
    delteGoals,
    updateGoals,
}