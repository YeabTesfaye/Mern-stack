const Joi = require('joi')

const validator = (schema) => (pyload) => schema.validate(pyload, {abortEarly : false})

 const userSchema = Joi.object({
   name: Joi.string().min(3).max(30).required(),
   email: Joi.string().min(3).max(200).required().email(),
   password: Joi.string().min(6).max(200).required(),
 });

 const goalSchema= Joi.object({
  text : Joi.string().min(3).max(30).required()
 })


exports.validateRegister = validator(userSchema)
exports.validateGoal = validator(goalSchema)