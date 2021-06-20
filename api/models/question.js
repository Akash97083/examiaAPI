const mongoose = require('mongoose')
const Joi = require('joi')

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
    category: { type: String, required:true},
    MCQ_Answers: [MCQ_Answers],
    Matching_Answers: [Matching_Answers],
    AnswerIsTrue: {type:Boolean, default:false},
    Complete_Answers: [Complete_Answers],
    isArchived: {type:Boolean, default:false},
})
const Question = mongoose.model('Question',questionSchema);

function validateQuestion(question){
    const schema = Joi.object({
        question:  Joi.string().min(10).max(1024).required(),
        difficulty: Joi.string().valid('Easy','Normal','Hard'),
        type: Joi.string().valid('Multiple Choice','True or False','Complete','Matching').required(),
        points: Joi.number().min(1).max(20).required(),
        instructor: Joi.string().required(),
        category: Joi.string().required(),
        MCQ_Answers: Joi.array().items({
            answer: Joi.string().required(),
            isCorrect: Joi.boolean().required(),
        }),
        Matching_Answers: Joi.array().items({
            Clue: Joi.string().required(),
            Match: Joi.string().required(),
            points: Joi.number().min(1).max(20).required(),
        }),
        AnswerIsTrue: Joi.boolean(),
        Complete_Answers: Joi.array().items({
            answer: Joi.string().required(),
        }),
    })
    return schema.validate(question, {stripUnknown:true});
}

exports.Question = Question
exports.validateQuestion = validateQuestion
