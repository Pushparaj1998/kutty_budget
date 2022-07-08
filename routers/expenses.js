const router = require('express').Router();
const auth = require('../middleware/bachelorauth');

const expensesController = require('../controllers/expenses');

router.post("/bachelor/expenses/create", auth, expensesController.create);

module.exports = router;