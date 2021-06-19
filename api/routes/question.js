const express = require('express')
const router = express.Router();
const authController = require('../controllers/student/authController');
const {Question} = require('../models/question.js');

const instructorAuth = require('../middlewares/instructor/auth')
//auth
router.get('/',instructorAuth, (req,res)=>{

});
router.put('/update',instructorAuth, authController.updateBasicInfo);
router.put('/update-password',instructorAuth, authController.updatePassword);

module.exports = router;
