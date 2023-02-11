const express = require('express')
const { getGaols, getSpecificGoals, updateGoals, delteGoals, setGoals } = require('../controllers/goalController')
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')

router.get('/' ,protect,getGaols)

router.post('/', protect, setGoals)

router.patch('/:id',protect, updateGoals)

router.delete('/:id',protect, delteGoals)
module.exports = router
