const mongoose = require('mongoose')

const MCQ_Answers = new mongoose.Schema({
    answer: String,
    isCorrect: {type:Boolean, default: false}
})
const Matching_Answers = new mongoose.Schema({
    Clue: String,
    Match: String,
    points: {type: Number,default:1},
})
const Complete_Answers = new mongoose.Schema({
    answer: {type:String, required:true}
})

const questionSchema = new mongoose.Schema({
    question: { type: String,required:true},
    difficulty: {type: String,enum:['Easy','Normal','Hard'],default:'Normal'},
    type: {type: String,enum:['Multiple Choice','True or False','Complete','Matching'],required:true},
    points: {type: Number,default:1},
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor',required:true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category',required:true},
    MCQ_Answers: [MCQ_Answers],
    Matching_Answers: [Matching_Answers],
    trueFalse: {type:Boolean, default:0},
    Complete_Answers: [Complete_Answers],
    isDeleted: {type:Boolean, default:false},
})
const Question = mongoose.model('Question',questionSchema);

exports.Question = Question
