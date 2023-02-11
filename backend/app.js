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

// cors error handling
app.use((req,res,next) => {
    res.header("Acess-Control-Allow-Origin", '*')
    res.header('Acess-Control-Allow-Header', 
    "Origin,X-Requested-With,Content-Type,Accept,Authorization")
    
    if(req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH,GET')
        return res.status(200)
    }
    next()
})

app.use('/api/goals', goalroutes)
app.use('/api/users' , userRouter)
app.use(errorHandler)

module.exports = app