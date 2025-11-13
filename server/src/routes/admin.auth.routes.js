const router = require('express').Router();
const { adminLogin } = require('../controllers/admin.auth.controller');

router.post('/login', adminLogin);

module.exports = router;
