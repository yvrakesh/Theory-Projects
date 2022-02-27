const express = require('express')

const router = express.Router();

const authController = require('../controllers/auth1')
const path = require('path')

router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)
router.get('/signup',authController.getSignup)
router.post('/signup',authController.postSignup)
router.get('/logout',authController.postLogout)


const homeController = require('../controllers/home')
console.log('Going to Home')
router.get('/home',homeController.goHome)
router.get('/error',authController.getRedirect)
router.get('*',authController.getToLogin)
module.exports = router