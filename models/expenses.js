const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    bachelor_id : {
        type: mongoose.Schema.Types.ObjectId
    },
    purpose: {
        type: String,
        enum: ["CURRENT_BILL", "GAS", "WATER", "GLOSSERY", "RENT", "OTHERS"]
    },
    purchase_date: {
        type: Date
    },
    amount: {
        type: Number
    },
    status: {
        type: Boolean
    }  
}, { timestamps : true });

const ExpenseSchema = mongoose.model('expenses', expenseSchema);

module.exports = ExpenseSchema;