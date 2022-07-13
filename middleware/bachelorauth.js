const jwt = require('jsonwebtoken');

const Bachelor = require('../models/bachelors');

const auth = async(req, res, next) => {
    try {
        // const token = req.cookies.bachelor_token;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            return res.status(400).send({ status:401, success: false, message: "no token provided!!!"})
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        const bachelor = await Bachelor.findOne({ _id: decode._id, status: true});
        if(!bachelor) {
            throw new Error('Invalid Credentials');
        }
        req.token = token;
        req.bachelor = bachelor;
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ status:400, success: false, message: "Logged out kindly Login" }); 
    }
}

module.exports = auth