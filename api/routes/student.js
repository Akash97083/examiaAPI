const express = require('express')
const router = express.Router();
const authController = require('../controllers/student/authController');
const StudentAuth = require('../middlewares/student/auth')
//auth
router.get('/',StudentAuth, authController.profile);
router.put('/update',StudentAuth, authController.updateBasicInfo);
router.put('/update-password',StudentAuth, authController.updatePassword);
router.get('/login', authController.login);
router.post('/signup', authController.register);

module.exports = router;
