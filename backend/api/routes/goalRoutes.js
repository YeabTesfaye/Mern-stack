const express = require('express')
const { getGaols, getSpecificGoals, updateGoals, delteGoals, setGoals } = require('../controllers/goalController')
const router = express.Router()

router.get('/', getGaols)

router.post('/', setGoals)

router.patch('/:id', updateGoals)

router.delete('/:id', delteGoals)
module.exports = router
