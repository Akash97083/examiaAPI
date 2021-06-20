const {Question,validateQuestion} = require('../../models/question.js');
const _ = require('underscore')
const questionController = {
    async all (req, res) {
        let all = await Question.find({})
            .populate('category','name')
            .populate('instructor','name')
        res.status(200).send(all)
    },
    async create (req, res) {
        const { error } = validateQuestion(req.body);
        if(error) return res.status(404).json(error.details)
        req.body.instructor= req.instructor._id
        Question.create(req.body).then(()=>{
            return res.status(200).json({
                message:"Question Created Successfully"
            })
        })
    },
    async delete (req, res) {
        await Question.findOneAndDelete(req.params.id)
        .then(()=>{
            return res.status(200).json({
                message:"Question Successfully Deleted"
            })
        }).catch((error)=>{
            return res.status(404).json({
                message:error
            })
        })
    },
    async update (req, res) {
        const { error } = validateQuestion(req.body);
        if(error) return res.status(404).json(error.details)
        await Question.findByIdAndUpdate(req.params.id,req.body)
            .then(()=>{
                return res.status(200).json({
                    message:"Question Updated Deleted"
                })
            }).catch((error)=>{
                return res.status(404).json({
                    message:error
                })
            })

    },
    async setArchived (req, res) {
        await Question.findById(req.params.id)
            .then((q)=>{
                q.isArchived = !q.isArchived
                q.save()
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

module.exports = questionController;
