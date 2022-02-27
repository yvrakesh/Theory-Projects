const express = require('express');
const xssController = require('../controllers/xss');

const router = express.Router();

router.get('/xss',xssController.getXss);
router.post('/xss',xssController.postXss);
router.get('/correctedxss',xssController.getCorrectedXss);
router.post('/correctedxss',xssController.postCorrectedXss);

router.get('/reflectedXss',xssController.getReflectedXss);
router.post('/reflectedXss',xssController.postReflectedXss);
router.get('/correctedreflectedXss',xssController.getCorrectedReflectedXss);
router.post('/correctedreflectedXss',xssController.postCorrectedReflectedXss);

router.get('/domXss',xssController.getDomXss);
router.get('/correcteddomXss',xssController.getCorrectedDomXss);


module.exports = router;