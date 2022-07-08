const Budget = require('../models/budget');

class budgetController {
    constructor() { }

    async create(req, res) {
        try {
            let budgets = []
            const individual_amt = ( (req.body.total_amt)/req.body.bachelor.length );
            for(let i=0;i<req.body.bachelor.length;i++) {
                const data = req.body
                data.bachelor_id = data.bachelor[i];
                data.admin_bachelor_id = req.bachelor._id
                data.individual_amt = individual_amt
                budgets[i] = await new Budget(data).save();
            }
            return res.status(200).json({ status: 200, success: true, message: "Budget Created Successfully", data: budgets });
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

    async paid(req, res) {
        try {
            const paid = await Budget.findOne({ _id: req.params.id , bachelor_id: req.bachelor._id });
            if(paid) {
                paid.paid = true;
                await paid.save();
                return res.status(200).send({ status: 200, success: true, message: "Paid status changed successfully", data: paid });
            } else {
                return res.status(200).send({ status: 400, success: false, message: "Budget not found"});
            }
        } catch (error) {
            console.log("Error @ paidStatus : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to change Paid Status"});
        }
    }

    async approve(req, res) {
        try{
            const budget = await Budget.findOne({ _id : req.params.id });
            if( ((budget.bachelor_id).toString()) == ((req.bachelor._id).toString()) ) {
                return res.status(200).json({ status: 400, success: false, message: "You can't approve yourself"});
            } else if ( ((budget.bachelor_id).toString()) != ((req.bachelor._id).toString()) ) {
                budget.approved = !budget.approved
                await budget.save();
                if(budget.approved == true) {
                    return res.status(200).json({ status: 200, success: true, message: "Budget Approved successfully", data: budget});
                } else {
                    return res.status(200).json({ status: 200, success: true, message: "Budget Pending successfully", data: budget});
                }
            }
        } catch(error) {
            console.log("Error @ approve budget : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to approv", error: error.message });
        }
    }

    async reject(req, res) {
        try {
            const budget = await Budget.findOne({ _id: req.params.id });
            if( ((budget.bachelor_id).toString()) == ((req.bachelor._id).toString()) ) {
                return res.status(200).json({ status: 400, success: false, message: "You can't Reject yourself"});
            } else if ( ((budget.bachelor_id).toString()) != ((req.bachelor._id).toString()) ) {
                budget.status = false
                await budget.save();
                return res.status(200).json({ status: 200, success: true, message: "Rejected Successfully", data: budget });
            }
        } catch (error) {
            console.log("Error @ reject Budget : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to reject", error: error.message });
        }
    }

    async approveList(req, res) {
        try {
            const page = req.body.page;
            const limit = req.body.limit;
            const skip = (page - 1) * limit;
            const budget = await Budget.find({ approved : true, status: true }).skip(skip).limit(limit);
            return res.status(200).json({ status: 200, success: true, message: "Approved list fetched successfully", data: budget });
        } catch (error) {
            console.log("Error @ approveList : ", error );
            return req.status(400).send({ status: 400, success: false, message: "Failed to fetch approve list", error: error.message });
        }
    }

    async rejectList(req, res) {
        try {
            const page = req.body.page;
            const limit = req.body.limit;
            const skip = (page - 1) * limit;
            const budget = await Budget.find({ approved: false, status : false }).skip(skip).limit(limit);
            return res.status(200).json({ status: 200, success: true, message: "Rejected list fetched successfully", data: budget });
        } catch (error) {
            console.log("Error @ rejectList : ", error );
            return req.status(400).send({ status: 400, success: false, message: "Failed to fetch reject list", error: error.message });
        }
    }

    async pendingList(req, res) {
        try {
            const page = req.body.page;
            const limit = req.body.limit;
            const skip = (page - 1) * limit;
            const budget = await Budget.find({ approved: false, status : true }).skip(skip).limit(limit);
            return res.status(200).json({ status: 200, success: true, message: "Pending list fetched successfully", data: budget });
        } catch (error) {
            console.log("Error @ pendingList : ", error );
            return req.status(400).send({ status: 400, success: false, message: "Failed to fetch pending list", error: error.message });
        }
    }

    async paidList(req, res) {
        try {
            const page = req.body.page;
            const limit = req.body.limit;
            const skip = (page - 1) * limit;
            const budget = await Budget.find({ approved: true, status : true , paid: true}).skip(skip).limit(limit);
            return res.status(200).json({ status: 200, success: true, message: "Paid list fetched successfully", data: budget });
        } catch (error) {
            console.log("Error @ paidList : ", error );
            return req.status(400).send({ status: 400, success: false, message: "Failed to fetch Paid List", error: error.message });
        }
    }
}

module.exports = new budgetController();