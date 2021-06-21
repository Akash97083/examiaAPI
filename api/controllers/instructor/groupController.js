const {Group,validateGroup} = require('../../models/group.js');
const _ = require('underscore')
const {Student} = require("../../models/student");
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
        await Group.findById(req.params.id)
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
    async members (req, res) {
        let members = await Student.find({ groups: { "$in" : [req.params.group]} }).select(['name','email','phone','student_id','isActive'])
        res.send(members)
    },
    async addMember (req, res) {
        await Student.findOne({student_id: req.params.student_id})
            .then((student)=>{
                if(student.groups.indexOf(req.params.group) === -1) {
                    student.groups.push(req.params.group);
                    student.save()
                    return res.status(200).json({
                        message:"Student added successfully"
                    })
                }else{
                    return res.status(400).json({
                        message:"student is already a member in the group"
                    })
                }
            }).catch(()=>{
                return res.status(404).json({
                    message:"Something went wrong"
                })
            })
    },
    async removeMember (req, res) {
        await Student.findOne({student_id: req.params.student_id})
            .then((student)=>{
                let indexOfGroupID = student.groups.indexOf(req.params.group)
                if(indexOfGroupID > -1) {
                    student.groups.splice(indexOfGroupID, 1);
                    student.save()
                    return res.status(200).json({
                        message:"Student removed successfully"
                    })
                }else{
                    return res.status(400).json({
                        message:"student is not a member in the group"
                    })
                }
            }).catch(()=>{
                return res.status(404).json({
                    message:"Something went wrong"
                })
            })
    },

};

module.exports = questionController;
