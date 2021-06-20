const {Group,validateGroup} = require('../../models/group.js');
const _ = require('underscore')
const questionController = {
    async all (req, res) {
        let all = await Group.find({instructor:req.instructor._id})
        res.status(200).send(all)
    },
    async getOne (req, res) {
        let all = await Group.findOne({_id:req.params.id ,instructor:req.instructor._id})
        res.status(200).send(all)
    },
    async create (req, res) {
        const { error } = validateGroup(req.body);
        if(error) return res.status(404).json(error.details)
        let groupFound = await Group.find({name:req.body.name,instructor:req.instructor._id})
        console.log(groupFound)
        if (groupFound.length > 0){
            return res.status(400).json({
                message: req.body.name + " Already exists"
            })
        }
        req.body.instructor= req.instructor._id
        Group.create(req.body).then(()=>{
            return res.status(200).json({
                message:"Group Created Successfully"
            })
        })
    },
    async delete (req, res) {
        await Group.findOneAndDelete(req.params.id)
        .then(()=>{
            return res.status(200).json({
                message:"Group Successfully Deleted"
            })
        }).catch((error)=>{
            return res.status(404).json({
                message:error
            })
        })
    },
    async update (req, res) {
        const { error } = validateGroup(req.body);
        if(error) return res.status(404).json(error.details)
        await Group.findByIdAndUpdate(req.params.id,req.body)
            .then(()=>{
                return res.status(200).json({
                    message:"Group Updated Deleted"
                })
            }).catch((error)=>{
                return res.status(404).json({
                    message:error
                })
            })

    },
    async deactivate (req, res) {
        await Question.findById(req.params.id)
            .then((q)=>{
                q.isActive = !q.isActive
                q.save()
                return res.status(200).json({
                    message:"Active Toggled"
                })
            }).catch((error)=>{
                return res.status(404).json({
                    message:error
                })
            })

    },
};

module.exports = questionController;
