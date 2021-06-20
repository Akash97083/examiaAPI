const {Category,validateName} = require('../../models/category.js');
const _ = require('underscore')
const categoryController = {
    async all (req, res) {
        let cat = await Category.find({instructor:req.instructor._id})
        res.status(200).send(cat)
    },
    async create (req, res) {
        const { error } = validateName(req.body);
        if(error) return res.status(404).json(error.details)
        Category.create({
            name:req.body.name,
            instructor: req.instructor._id
        }).then(()=>{
            return res.status(200).json({
                message:"Category Created Successfully"
            })
        })
    },
    async delete (req, res) {
        let cat = await Category.findOneAndDelete(req.body._id)
        .then(()=>{
            return res.status(200).json({
                message:"Category Successfully Deleted"
            })
        }).catch((error)=>{
            return res.status(404).json({
                message:error
            })
        })
    },
    async update (req, res) {
        const { error } = validateName(req.body);
        if(error) return res.status(404).json(error.details)
        let cat = await Category.findById(req.body._id)
        cat.name = req.body.name
        cat.save().then(()=>{
            return res.status(200).json({
                message:"Successfully Updated"
            })
        }).catch(()=>{
            return res.status(404).json({
                message:error
            })
        })
    },
};

module.exports = categoryController;
