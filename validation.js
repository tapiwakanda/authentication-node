

//Validate password
const Joi = require('joi')
//Register validation

const registrationValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data,)
}

const loginValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }) 
    return schema.validate(data)
}

module.exports.registrationValidation = registrationValidation
module.exports.registrationValidation = registrationValidation