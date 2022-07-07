const Budget = require('../models/budget');

class budgetController {
    constructor() { }

    async create(req, res) {
        try {
            const data = req.body
            data.bachelor_id = req.bachelor._id
            const budget = await new Budget(data).save();
            return res.status(200).json({ status: 200, success: true, message: "Budget Created Successfully", data: budget });
        } catch (error) {
            console.log("Error @ budget create : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to create budget", error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const page = req.body.page;
            const limit = req.body.limit;
            const skip = (page - 1) * limit;
            const budget = await Budget.find({}).sort({ _id : -1 }).skip(skip).limit(limit);
            return res.status(200).json({ status: 200, success: true, message: "All Budget Fetched Successfully", data: budget }); 
        } catch (error) {
            console.log("Error @ getAll budget : ", error)
            return res.status(400).send({ status: 400, success: false, message: "Failed to fetch the all budget", error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const page = req.body.page;
            const limit = req.body.limit;
            const skip = (page - 1) * limit;
            const budget = await Budget.find({ bachelor_id : req.bachelor._id }).sort({ _id : -1 }).skip(skip).limit(limit);
            return res.status(200).json({ status: 200, success: true, message: "Budget Fetched Successfully", data: budget }); 
        } catch (error) {
            console.log("Error @ getById budget : ", error)
            return res.status(400).send({ status: 400, success: false, message: "Failed to fetch the budget", error: error.message });
        }
    }

    async approve(req, res) {
        try{
            const budget = await Budget.findOne({ _id : req.params.id });
            console.log("req.bachelor._id---------------------->", req.bachelor._id)
            console.log("budget.bachelor_id--------------------->", budget.bachelor_id)

            if( budget.bachelor_id == req.bachelor._id ){
                return res.status(200).json({ status: 400, success: false, message: "You can't approve yourself"});
            } else if (budget.bachelor_id != req.bachelor._id) {
                budget.approved = !budget.approved
                await budget.save();
                if(budget.approved == true) {
                    return res.status(200).json({ status: 200, success: true, message: "Budget Approved successfully", data: budget});
                } else {
                    return res.status(200).json({ status: 200, success: true, message: "Budget Rejected successfully", data: budget});
                }
            }
        } catch {
            console.log("Error @ approve budget : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to approv", error: error.message });
        }
    }

}

module.exports = new budgetController();