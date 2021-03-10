const express = require('express');

const nssVounteerController = require('../controllers/nssvolunteer');

const router = express.Router();

router.get('/nssvolunteer', nssVounteerController.getNssvolunteer);

router.post('/takefarmwork', nssVounteerController.postTakefarmwork);
router.post('/takesocialwork', nssVounteerController.postTakesocialwork);

router.get('/givefarmproof/:takenfarmId',nssVounteerController.getGiveFarmproof);
router.get('/givesocialproof/:takensocialId',nssVounteerController.getGiveSocialproof);

router.post('/farmproof',nssVounteerController.postFarmproof);
router.post('/socialproof',nssVounteerController.postSocialproof);

router.get('/nssvolunteer/editProfile', nssVounteerController.getEditProfile);
router.post('/nssvolunteer/editProfile', nssVounteerController.postEditProfile);

router.get('/nssvolunteer/pastActivities', nssVounteerController.getPastActivities);


module.exports = router;

