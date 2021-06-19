const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: { type: String,required:true},
    difficulty: {type: String,enum:['Easy','Normal','Hard'],default:'Normal'},
    type: {type: String,enum:['Multiple Choice','True or False','Complete','Matching'],required:true},
    points: {type: Number,default:1},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'},
})
const Category = mongoose.model('Question',categorySchema);

exports.Category = Category
