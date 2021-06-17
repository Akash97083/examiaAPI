const mongoose = require('mongoose')
const Joi = require('joi')

const Instructor = mongoose.model('Instructor',mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    email: {
        type: String,
        unique:true,
        required: true,
        minlength: 8,
        maxlength: 50
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
}));
function validateRegister(instructor){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.ref('password'),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    return schema.validate(instructor);

}
function validateLogin(){

}
exports.Instructor = Instructor
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
