const bodyParser = require('body-parser')
const express   = require('express')
const morgan = require('morgan')
const { errorHandler } = require('./api/middlewares/errorMiddleware')
const goalroutes = require('./api/routes/goalRoutes')
const userRouter = require('./api/routes/userRoute')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


app.use('/api/goals', goalroutes)
app.use('/api/users' , userRouter)
app.use(errorHandler)

module.exports = app