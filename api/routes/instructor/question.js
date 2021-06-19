const express = require('express')
const router = express.Router();
const authController = require('../../controllers/student/authController');
const {Question} = require('../../models/question.js');
const {Category} = require('../../models/category.js');

const instructorAuth = require('../../middlewares/instructor/auth')
//auth
router.get('/',instructorAuth,async (req,res)=>{
    Category.create({
        name:'cat1',
        parent:'60ce004c42ca4d09805aff95',
        instructor: req.instructor._id
    })
    Question.create({
        question:'hi there',
        type:'Multiple Choice',
        points: 5,
        MCQ_Answers:[
            {answer: 'ans1', isCorrect: true},
            {answer: 'ans2', isCorrect: false},
            {answer: 'ans3', isCorrect: true},
            {answer: 'ans4', isCorrect: false},
            {answer: 'ans5', isCorrect: true},
            {answer: 'ans6', isCorrect: false},
        ],
        category: '60ce004c42ca4d09805aff95',
        instructor: req.instructor._id
    })
    let all = await Question.find({})
        .populate('category','name')
        .populate('instructor','name')
    res.send(all)
});

module.exports = router;
