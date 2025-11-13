const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { listUsers, deleteUser, listTrips, metrics } = require('../controllers/admin.controller');

router.use(auth, admin);
router.get('/metrics', metrics);
router.get('/users', listUsers);
router.delete('/users/:id', deleteUser);
router.get('/trips', listTrips);

module.exports = router;
