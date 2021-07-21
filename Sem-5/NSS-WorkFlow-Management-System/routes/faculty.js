const express = require('express');

const facultyController = require('../controllers/faculty');
const router = express.Router();

router.get('/faculty',facultyController.getFaculty);

router.get('/faculty/editProfile', facultyController.getEditProfile);
router.post('/faculty/editProfile', facultyController.postEditProfile);

router.post('/takestudent', facultyController.postTakeStudent);
router.get('/givegrade/:studentId', facultyController.getGiveGrades);
router.post('/givegrade/:studentId', facultyController.postGiveGrades);

module.exports = router;