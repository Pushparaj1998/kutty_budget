const Bachelor = require('../models/bachelors');

class BachelorController {
    constructor() { }

    async register(req, res) {
        try {
            const bachelor = await new Bachelor(req.body).save();
            return res.status(200).json({ status: 200, success: true, message: "Bachelor Created Successfully", data: bachelor });
        } catch (error) {
            console.log("Error @ Bachelor Register : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to Register", error: error.message });
        }
    }

    async login(req, res) {
        try {
            const bachelor = await Bachelor.findByCredentials(req.body.email, req.body.password);
            if(bachelor) {
                const token = await bachelor.generateAuthToken();
                return res.cookie('bachelor_token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false })
                .json({ status: 200, success : true, message: "Login successfull", data: bachelor });
            } else {
                return res.status(200).send({ status: 400, success: false, message: "Bachelor not found" });
            }
        } catch (error) {
            console.log("Error @ login : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Login Failed", error: error.message });
        }
    }

    async logout(req, res) {
        try {
            await res.clearCookie('bachelor_token');
            return res.status(200).send({ status: 200, success: true, message: "Logout Successfull" });
        } catch (error) {
            console.log("Error @ logout : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Logout Failed", error: error.message });
        }
    }

    async get(req, res) {
        try {
            const bachelor = await Bachelor.findOne({_id : req.bachelor._id });
            return res.status(200).json({ status: 200, success: true, message: "Bachelor Details Fetched Successfully", data: bachelor });
        } catch (error) {
            console.log("Error @ get bachelor : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to fetch the bachelor details", error: error.message });
        }
    }

    async status(req, res) {
        try {
            const bachelor = await Bachelor.findOne({ _id : req.params.id });
            bachelor.status = !bachelor.status;
            await bachelor.save();
            return res.status(200).json({ status: 200, success: true, message: "Status Changed Successfully", data: bachelor });
        } catch (error) {
            console.log("Error @ change status : ", error);
            return res.status(400).send({ status: 400, success: false, message: "Failed to Change Status", error: error.message });
        }   
    }
}

module.exports = new BachelorController();