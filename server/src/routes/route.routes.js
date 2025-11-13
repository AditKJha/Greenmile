const router = require('express').Router();
const { optimizeRoute } = require('../controllers/route.controller');
router.post('/optimize', optimizeRoute);
module.exports = router;
