const mongoose = require('mongoose')
const Joi = require('joi')

const invites = new mongoose.Schema({
    code: String,
    use_count: Number,
    valid_until: Date,
    isActive: {type: Boolean, default: true},
})

const GroupSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    description: {type: String, minlength: 10, maxlength: 300,default: null},
    invites: [invites],
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor',required:true},
    isActive: {type: Boolean, default: true},
},
    { timestamps: true }
    )

const Group = mongoose.model('Group',GroupSchema);

function validateGroup(question){
    const schema = Joi.object({
        name:  Joi.string().min(3).max(50).required(),
        description: Joi.string().min(10).max(300),
        invites: Joi.array().items({
            code: Joi.string().required(),
            use_count: Joi.number().min(1).max(1000).default(1),
            valid_until: Joi.date().required(),
        }),
    })
    return schema.validate(question, {stripUnknown:true});
}
exports.Group = Group
exports.validateGroup = validateGroup