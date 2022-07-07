require('dotenv').config({ path : __dirname + '/config/.env' })
const express = require('express');
const cookieparser = require('cookie-parser');
require('./config/db');

const app = express();

app.use(express.json());
app.use(cookieparser(process.env.COOKIESECRET))

const bachelorRouter = require('./routers/bachelors');
const budgetRouter = require('./routers/budget');

app.use(bachelorRouter);
app.use(budgetRouter);

const port = 4002 || process.env.PORT;
console.log("process.env.PORT", process.env.PORT)
app.listen(port, ()=> {
    console.log("Kutty Budget running on the port : ", port)
})