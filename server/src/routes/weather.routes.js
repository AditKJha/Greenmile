const router = require('express').Router();
const { getWeather } = require('../controllers/weather.controller');
router.get('/:location', getWeather);
module.exports = router;
