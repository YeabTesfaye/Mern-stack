const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {type : String,  required : [true , 'plase add a name filed']},
    email : {type : String ,  required : [true , 'please add an email field']},
    password : {type : String , required : [true , 'please add a password filed']}
}, {
    timestamps : true
})


module.exports = mongoose.model('User', userSchema)