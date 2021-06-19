const express = require('express')
const router = express.Router();
const authController = require('../../controllers/instructor/authController');
const InstructorAuth = require('../../middlewares/instructor/auth')
//auth
router.get('/', InstructorAuth, authController.profile);
router.put('/update', InstructorAuth, authController.updateBasicInfo);
router.put('/update-password',InstructorAuth, authController.updatePassword);
router.get('/login', authController.login);
router.post('/signup', authController.register);

module.exports = router;
