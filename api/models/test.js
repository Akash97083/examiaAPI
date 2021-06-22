const mongoose = require('mongoose')
const Joi = require('joi')

const access_codes = new mongoose.Schema({
    code: String,
    use_count: Number,
    valid_until: Date,
    isActive: {type: Boolean, default: true},
})

const settings = new mongoose.Schema({
    startTime: {type: Date, default: Date.now()},
    endTime: {type: Date, required: true},
    duration: {type: Number, required: true},
    random: {type: Boolean, default: false},
    can_return_to_prev_question: {type: Boolean, default: true},
    view_answers: {type: String, enum: ['After Perform', 'After Test', 'Never'], default: 'After Test'},
    release_score: {type: String, enum: ['After Perform', 'After Test', 'Never'], default: 'After Perform'},
    pass_percent: {type: Number, min: 1, max: 100, default: 60},
})

const TestSchema = mongoose.Schema({
        name: {type: String, required: true, minlength: 3, maxlength: 50},
        description: {type: String, minlength: 10, maxlength: 300, default: null},
        category: {type: String, required: true},
        questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
        settings: settings,
        access_codes: [access_codes],
        instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true},
        is_archived: {type: Boolean, default: false},
    },
    {timestamps: true}
)

const Test = mongoose.model('Test', TestSchema);

function validateTest(Test) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(10).max(300),
        category: Joi.string().required(),
    })
    return schema.validate(Test, {stripUnknown: true});
}

function validateSettings(settings) {
    const schema = Joi.object({
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
        duration: Joi.number().required(),
        random: Joi.boolean(),
        can_return_to_prev_question: Joi.boolean(),
        view_answers: Joi.string().valid('After Perform', 'After Test', 'Never').required(),
        release_score: Joi.string().valid('After Perform', 'After Test', 'Never').required(),
        pass_percent: Joi.number(),
    })
    return schema.validate(settings, {stripUnknown: true});
}

exports.Test = Test
exports.validateGroup = validateTest
