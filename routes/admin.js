const express = require('express')

const router = express.Router();

const authController = require('../controllers/auth')
const path = require('path')

router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)
router.get('/logout',authController.postLogout)

const homeController = require('../controllers/home')
router.get('/home',homeController.goHome)
router.get('/error',authController.getRedirect)
// router.get('/error',authController.getRedirect)
router.get('/',authController.getLogin)
module.exports = router