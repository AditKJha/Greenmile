const router = require('express').Router();
const { getStatus } = require('../controllers/battery.controller');
router.get('/status', getStatus);
module.exports = router;
