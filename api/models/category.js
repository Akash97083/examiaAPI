const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String,required:true},
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Category',default:null},
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor',required: true},
})
const Category = mongoose.model('Category',categorySchema);

function validateName(name){
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
        parent: Joi.string(),
        instructor: Joi.required()
    })
    return schema.validate(name);
}

exports.Category = Category
exports.validateName = validateName
