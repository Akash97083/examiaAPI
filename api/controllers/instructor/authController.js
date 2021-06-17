const {Instructor,validateRegister,validateLogin} = require('../../models/instructor.js');
const Joi = require('joi')
const bcrypt = require('bcrypt')

const authController = {
    async login (req, res) {
        // Returns all products
        Instructor.find({})
            // alongside it's manufacturer
            // information
            .populate('manufacturer')
            .exec((err, products) => res.json(products))
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
