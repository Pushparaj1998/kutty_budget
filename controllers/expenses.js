const Expenses = require('../models/expenses');

class expensesController {
    constructor() { }

    async create(req, res) {
        try {
            const expenses = await new Expenses(req.body);
            return res.status(200).json({ status: 200, success: true, message: "Expenses Created Successfully", data: expenses });
        } catch (error) {
            console.log("Error @ create Expenses : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to create expenses", error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const page = req.body.page;
            const limit = req.body.limit;
            const skip = (page -1) * limit;
            const expenses = await Expenses.find({}).skip(skip).limit(limit);
            const count = await Expenses.find({}).countDocuments();
            return res.status(200).json({ status: 200, success: true, message: "Expenses fetched successfully", count: count, data: expenses });
        } catch(error) {
            
        }
    }

}

module.exports = new expensesController();