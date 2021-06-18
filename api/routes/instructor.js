const express = require('express')
const router = express.Router();
const authController = require('../controllers/instructor/authController');
//auth
router.get('/', authController.me);
router.get('/login', authController.login);

router.post('/signup', authController.register);

module.exports = router;
