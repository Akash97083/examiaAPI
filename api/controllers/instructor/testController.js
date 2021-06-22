const {Test,validateTest,validateSettings} = require('../../models/test.js');
const _ = require('underscore')
const testController = {
    async categories (req, res) {
        console.log(333)
        let result = await Question.find({instructor:req.instructor._id}).distinct('category')
        res.status(200).send(result)
    },

    async all (req , res) {
        let all = await Test.find({instructor:req.instructor._id})
        res.status(200).send(all)
    },
    async getOne (req, res) {
        let all = await Test.findOne({_id:req.params.id ,instructor:req.instructor._id})
        res.status(200).send(all)
    },
    async getByCategory (req, res) {
        let all = await Test.find({instructor:req.instructor._id,category:req.params.cat})
        res.status(200).send(all)
    },
    async create (req, res) {
        const { error } = validateTest(req.body);
        if(error) return res.status(404).json(error.details)
        req.body.instructor= req.instructor._id
        Test.create(req.body).then(()=>{
            return res.status(200).json({
                message:"Test Created Successfully"
            })
        })
    },
    async delete (req, res) {
        await Test.findOneAndDelete(req.params.id)
        .then(()=>{
            return res.status(200).json({
                message:"Test Successfully Deleted"
            })
        }).catch((error)=>{
            return res.status(404).json({
                message:error
            })
        })
    },
    async update (req, res) {
        const { error } = validateTest(req.body);
        if(error) return res.status(404).json(error.details)
        await Test.findByIdAndUpdate(req.params.id,req.body)
            .then(()=>{
                return res.status(200).json({
                    message:"Test Updated Deleted"
                })
            }).catch((error)=>{
                return res.status(404).json({
                    message:error
                })
            })

    },
    async setArchived (req, res) {
        await Test.findById(req.params.id)
            .then((test)=>{
                test.isArchived = !test.isArchived
                test.save()
                return res.status(200).json({
                    message:"Archive Toggled"
                })
            }).catch((error)=>{
                return res.status(404).json({
                    message:error
                })
            })

    },
};

module.exports = testController;
