const express = require('express')
const router = express.Router();
const categoryController = require('../../controllers/instructor/categoryController');
const InstructorAuth = require('../../middlewares/instructor/auth')

//category
router.get('/',InstructorAuth, categoryController.all);
router.post('/create',InstructorAuth, categoryController.create);
router.put('/update',InstructorAuth, categoryController.update);
router.delete('/delete',InstructorAuth, categoryController.delete);

module.exports = router;
