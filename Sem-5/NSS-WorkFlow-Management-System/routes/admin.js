const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin/addperson',adminController.getAddperson);

router.post('/admin/addperson',adminController.postAddperson);

router.get('/admin/editprofile',adminController.getEditProfile);

router.post('/admin/editprofile',adminController.postEditProfile);



module.exports = router;