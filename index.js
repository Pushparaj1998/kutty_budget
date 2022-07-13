require('dotenv').config({ path : __dirname + '/config/.env' })
const express = require('express');
const cookieparser = require('cookie-parser');
require('./config/db');

const app = express();

app.use(express.json());
app.use(cookieparser(process.env.COOKIESECRET))

app.use(function (req, res, next) {
    const allowedOrigins = ["http://localhost:4200", "http://localhost:4300"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})

const bachelorRouter = require('./routers/bachelors');
const budgetRouter = require('./routers/budget');

app.use(bachelorRouter);
app.use(budgetRouter);

const port = 4002 || process.env.PORT;

app.listen(port, "10.1.41.241", ()=> {
    console.log("Kutty Budget running on the port : ", port)
})