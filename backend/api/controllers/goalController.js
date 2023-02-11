const asyncHandler = require('express-async-handler')

// @desc get Goals
// @route GET /api/goals
// @access public
const getGaols  = asyncHandler((req,res) => {
    res.status(200).json({
        msg : 'get All Goals'
    })
})

// @des set Goals
// @route POST /api/gaols
// @access private
const setGoals = asyncHandler((req,res) => {
    if(!req.body.text){
        res.status(404)
        throw new Error('plase add a text filed')
    }
    res.status(200).json({
        sucess : true,
        msg : req.body.text
    })
})

// @des delete Goals
// @route DELETE /api/goals
// @access private
const delteGoals = asyncHandler((req,res) =>{
    res.status(200).json({
        sucess : true,
        msg : `delete a route ${req.params.id}`
    })
})

// @des update goals
// @route PATCH /api/gaols/:id
// @acess private
const updateGoals = asyncHandler((req,res) => {
    res.status(201).json({
        sucess:true,
        msg : 'update a route'
    })
})

// @des get specfice goal
// @route GET /api/goals/:id
// @access public
const getSpecificGoals  = asyncHandler((req,res) => {
    res.status(200).json({
        sucess : true,
        msg : `get specfic route ${req.params.id} `
    })
})
module.exports = {
    getGaols,
    setGoals,
    delteGoals,
    updateGoals,
    getSpecificGoals
}