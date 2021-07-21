const express = require('express');

const studentController = require('../controllers/student');

const router = express.Router();

router.get('/student',studentController.getStudent);
router.post('/joinfarmwork',studentController.postJoinfarmwork);
router.post('/joinsocialwork',studentController.postJoinsocialwork);

router.get('/student/editProfile', studentController.getEditProfile);
router.post('/student/editProfile', studentController.postEditProfile);

router.get('/student/pastActivities', studentController.getPastActivities);
router.get('/student/specialProjectGroup', studentController.getSpecialProjectGroup);

router.get('/createsplgrp',studentController.getCreateSplGrp);
router.post('/createsplgrp',studentController.postCreateSplGrp);

module.exports = router;