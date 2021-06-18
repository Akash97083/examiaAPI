const {Instructor,validateRegister,validateLogin} = require('../../models/instructor.js');
const Joi = require('joi')
const _ = require('underscore')
const bcrypt = require('bcrypt')
const authController = {
    async me (req, res) {
        Instructor.findOne({email:req.body.email})
    },
    async login (req, res) {
        Instructor.findOne({email:req.body.email})
            .then((inst=>{
                if(Instructor.length > 0) {
                    bcrypt.compare(req.body.password, inst.password)
                        .then((validPassword)=>{
                            if(validPassword) {
                                let token = inst.generateTokens()
                                return res.header('x-auth-token',token).send(_.pick(inst,['_id','name','email']))
                            }})
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
};

module.exports = authController;
