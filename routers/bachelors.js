const router = require('express').Router();
const bachelorAuth = require('../middleware/bachelorauth');
const bachelorController = require('../controllers/bachelor');

router.post('/bachelor/register', bachelorController.register);
router.post('/bachelor/login', bachelorController.login);
router.get('/bachelor/get', bachelorAuth, bachelorController.get);
router.get('/bachelor/logout', bachelorAuth, bachelorController.logout);
router.get('/bachelor/status/change/:id', bachelorAuth, bachelorController.status);

module.exports = router;
