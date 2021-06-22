const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const StudentSchema = mongoose.Schema({
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
    student_id: {
        type: String,
        unique:true,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    phone: {
        type: String,
        unique:true,
        required: true,
        minlength: 10,
        maxlength: 15
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    results:[{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
    assignedTests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
    isActive: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
})

StudentSchema.methods.generateTokens = function generateTokens() {
    const token = jwt.sign({_id:this._id,}, "studentKey")
    return token
}
const Student = mongoose.model('Student',StudentSchema);

function validateRegister(Student){
    const schema = Joi.object({
        name: Joi.string()
            .min(10)
            .max(50)
            .required(),
        password: Joi.string()

            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.ref('password'),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        phone: Joi.string().min(10).pattern(/^[0-9]+$/).required(),
        student_id: Joi.string().min(7).max(20).pattern(/^[0-9]+$/).required(),
    })
    return schema.validate(Student);

}
function validateLogin(credentials){
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    return schema.validate(credentials);
}
function validatePassword(password){
    const schema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.ref('password'),
    })
    return schema.validate(password);
}
function validateBasicUpdate(student){
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        phone: Joi.string().min(10).pattern(/^[0-9]+$/).required(),
    })
    return schema.validate(student);
}

exports.Student = Student
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
exports.validateBasicUpdate = validateBasicUpdate;
exports.validatePassword = validatePassword;
