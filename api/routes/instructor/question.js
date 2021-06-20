const express = require('express')
const router = express.Router();
const questionController = require('../../controllers/instructor/questionController');

const instructorAuth = require('../../middlewares/instructor/auth')
//auth
router.get('/',instructorAuth,questionController.all);
router.get('/categories',instructorAuth,questionController.categories);
router.get('/one/:id',instructorAuth,questionController.getOne);
router.get('/category/:cat',instructorAuth,questionController.getByCategory);
router.post('/create',instructorAuth,questionController.create);
router.post('/update/:id',instructorAuth,questionController.update);
router.post('/archive/:id',instructorAuth,questionController.setArchived);
router.delete('/delete/:id',instructorAuth,questionController.delete);

module.exports = router;
