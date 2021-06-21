const express = require('express')
const router = express.Router();
const groupController = require('../../controllers/instructor/groupController');

const instructorAuth = require('../../middlewares/instructor/auth')
//auth
router.get('/',instructorAuth,groupController.all);
router.get('/one/:id',instructorAuth,groupController.getOne);
router.post('/add-member/:group/:student_id',instructorAuth,groupController.addMember);
router.post('/remove-member/:group/:student_id',instructorAuth,groupController.removeMember);
router.post('/members/:group',instructorAuth,groupController.members);
router.post('/create',instructorAuth,groupController.create);
router.post('/update/:id',instructorAuth,groupController.update);
router.post('/deatcivate/:id',instructorAuth,groupController.deactivate);
router.delete('/delete/:id',instructorAuth,groupController.delete);

module.exports = router;
