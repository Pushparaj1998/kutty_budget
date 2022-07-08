const router = require('express').Router();
const auth = require('../middleware/bachelorauth');

const budgetController = require('../controllers/budget');

router.post('/bachelor/budget/create', auth, budgetController.create);
router.post('/bachelor/budget/getAll', auth, budgetController.getAll);
router.post('/bachelor/budget/getById', auth, budgetController.getById);
router.get('/bachelor/budget/approve/:id', auth, budgetController.approve);
router.get('/bachelor/budget/reject/:id', auth, budgetController.reject);
router.post('/bachelor/budget/approveList', auth, budgetController.approveList);
router.post('/bachelor/budget/rejectList', auth, budgetController.rejectList);
router.post('/bachelor/budget/pendingList', auth, budgetController.pendingList);
router.get('/bachelor/budget/paid/:id', auth, budgetController.paid);
router.post('/bachelor/budget/paidList'  , auth, budgetController.paidList);

module.exports = router;