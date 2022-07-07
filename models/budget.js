const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    bachelor_id : {
        type: mongoose.Schema.Types.ObjectId
    },
    admin_bachelor_id : {
        type: mongoose.Schema.Types.ObjectId
    },
    amount: {
        type: Number
    },
    date: {
        type: Date
    },
    term: {
        type: Number
    },
    purpose: {
        type: String,
        enum: [ "CURRENT_BILL", "GAS", "WATER", "GLOSSERY", "RENT", "OTHERS"]
    },
    description: {
        type: String
    },
    approved:{
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps : true });

const BudgetSchema = mongoose.model('budget', budgetSchema);

module.exports = BudgetSchema;