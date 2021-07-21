const express = require('express');

const socialheadController = require('../controllers/socialhead');
const router = express.Router();

router.get('/socialhead',socialheadController.getSocialhead);
router.post('/addsocialwork',socialheadController.postSocialwork);
router.get('/approvesocialproof/:submittedsocialId',socialheadController.getApprovesocialproof);
router.post('/approvesocialproof',socialheadController.postApprovesocialproof);

router.get('/socialhead/editProfile', socialheadController.getEditProfile);
router.post('/socialhead/editProfile', socialheadController.postEditProfile);

router.get('/socialhead/newsocialtask', socialheadController.getNewSocialTask);

module.exports = router;