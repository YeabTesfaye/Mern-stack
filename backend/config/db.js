const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const CONNECTDB = async () => {
    try{
        const conn  = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = CONNECTDB