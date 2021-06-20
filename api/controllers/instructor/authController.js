const {Instructor,validateRegister,validateLogin,validateBasicUpdate,validatePassword} = require('../../models/instructor.js');
const Joi = require('joi')
const _ = require('underscore')
const bcrypt = require('bcrypt')
const authController = {
    async profile (req, res) {
        let inst = await Instructor.findOne({_id:req.instructor._id})
        res.status(200).send(_.pick(inst,['_id','name','email','phone']))
    },
    async login (req, res) {
        const { error } = validateLogin(req.body);
        if(error) return res.status(404).json(error.details)
        Instructor.findOne({email:req.body.email})
            .then((inst=>{
                if(inst) {
                    bcrypt.compare(req.body.password, inst.password)
                        .then((validPassword)=>{
                            if(validPassword) {
                                let token = inst.generateTokens()
                                return res.header('x-auth-token',token).send(_.pick(inst,['_id','name','email','phone']))
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

        let instructorFound = await Instructor.find({email:req.body.email})
        if(instructorFound.length > 0)
            return res.status(404).json({
                message:"Email Already Exists"
            })
        const hash = bcrypt.hashSync(req.body.password, 10);
        const instructor = new Instructor({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
        })
        instructor.save().then((result)=>{
            return res.status(200).json({
                message:"Instructor Successfully Created"
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
        let _instructor = await Instructor.findById(req.instructor._id)
        _instructor.name = req.body.name
        if(req.body.email !== _instructor.email) {
            _instructor.email = req.body.email
            _instructor.emailVerified = false
        }
        if(req.body.phone !== _instructor.phone) {
            _instructor.phone = req.body.phone
            _instructor.phoneVerified = false
        }
        _instructor.save().then((result)=>{
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
        let _instructor = await Instructor.findById(req.instructor._id)
        const hash = await bcrypt.hashSync(req.body.password, 10);
        _instructor.password = hash
        _instructor.save().then((result)=>{
            return res.status(200).json({
                message:"Instructor Successfully Updated"
            })
        }).catch((error)=>{
            return res.status(404).json({
                message:error
            })
        })
    }

};

module.exports = authController;
