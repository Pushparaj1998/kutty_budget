const mongoose = require('mongoose');
const options = { useNewUrlParser : true, useUnifiedTopology: true };

mongoose.connect(process.env.MONGODB_URL, options);

mongoose.connection.on('connected', function(){
    console.log("Mongoose Connection is Open");
})

mongoose.connection.on('error', function(error) {
    console.log("Mongoose Connection has occured "+ error + "error" )
})

mongoose.connection.on('error', function() {
    console.log("Mongoose Connection is Disconnected" )
})

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log("Mongoose default connection is Disconnected");
        process.exit(0);
    })
})