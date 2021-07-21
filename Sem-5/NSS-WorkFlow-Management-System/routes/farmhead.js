const express = require('express');

const farmheadController = require('../controllers/farmhead');
const router = express.Router();

router.get('/farmhead',farmheadController.getFarmhead);
router.post('/addfarmwork',farmheadController.postFarmwork);
router.get('/approvefarmproof/:submittedfarmId',farmheadController.getApprovefarmproof);
router.post('/approvefarmproof',farmheadController.postApprovefarmproof);

router.get('/farmhead/editProfile', farmheadController.getEditProfile);
router.post('/farmhead/editProfile', farmheadController.postEditProfile);

router.get('/farmhead/newfarmtask', farmheadController.getNewFarmTask);

module.exports = router;