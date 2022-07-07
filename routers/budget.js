const router = require('express').Router();
const auth = require('../middleware/bachelorauth');

const budgetController = require('../controllers/budget');

router.post('/bachelor/budget/create', auth, budgetController.create);
router.post('/bachelor/budget/getAll', auth, budgetController.getAll);
router.post('/bachelor/budget/getById', auth, budgetController.getById);
router.get('/bachelor/budget/approve/:id', auth, budgetController.approve);
module.exports = router;