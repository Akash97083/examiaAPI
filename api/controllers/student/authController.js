const {Student,validateRegister,validateLogin,validateBasicUpdate,validatePassword} = require('../../models/student.js');
const Joi = require('joi')
const _ = require('underscore')
const bcrypt = require('bcrypt')
const authController = {
    async profile (req, res) {
        let student = await Student.findOne({_id:req.student._id})
        res.status(200).send(_.pick(student,['_id','name','email','phone','student_id']))
    },
    async login (req, res) {
        const { error } = validateLogin(req.body);
        if(error) return res.status(404).json(error.details)

        Student.findOne({email:req.body.email})
            .then((student=>{
                if(student) {
                    bcrypt.compare(req.body.password, student.password)
                        .then((validPassword)=>{
                            if(validPassword) {
                                let token = student.generateTokens()
                                return res.header('x-auth-token',token).send(_.pick(student,['_id','name','email','phone','student_id']))
                            }else{
                                return res.status(404).json({
                                    message:"Password is not correct"
                                })
                            }})
                }else{
                    return res.status(404).json({
                        message:"Email is not registered"
                    })
                }
            }))
    },
    async register (req, res) {
        const { error } = validateRegister(req.body);
        if(error) return res.status(404).json(error.details)

        let studentFound = await Student.find({email:req.body.email})
        if(studentFound.length > 0)
            return res.status(404).json({
                message:"Email Already Exists"
            })
        const hash = bcrypt.hashSync(req.body.password, 10);
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })
        student.save().then((result)=>{
            return res.status(200).json({
                message:"Student Successfully Created"
            })
        }).catch((error)=>{
            return res.status(404).json({
                message:error
            })
        })
    },
    async updateBasicInfo (req, res) {
        const { error } = validateBasicUpdate(req.body);
        if(error) return res.status(404).json(error.details)
        let student = await Student.findById(req.student._id)
        student.name = req.body.name
        if(req.body.email !== student.email) {
            student.email = req.body.email
            student.emailVerified = false
        }
        if(req.body.phone !== student.phone) {
            student.phone = req.body.phone
            student.phoneVerified = false
        }
        student.save().then((result)=>{
            return res.status(200).json({
                message:"Successfully Updated"
            })
        }).catch((error)=>{
            return res.status(404).json({
                message:error
            })
        })
    },
    async updatePassword (req, res) {
        const { error } = validatePassword(req.body);
        if(error) return res.status(404).json(error.details)
        let student = await Student.findById(req.student._id)
        const hash = await bcrypt.hashSync(req.body.password, 10);
        student.password = hash
        student.save().then((result)=>{
            return res.status(200).json({
                message:"Student Successfully Updated"
            })
        }).catch((error)=>{
            return res.status(404).json({
                message:error
            })
        })
    }

};

module.exports = authController;
