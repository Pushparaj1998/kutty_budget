const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const bachelorschema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile_number: {
        type: Number
    },
    dob: {
        type: Date
    },
    password: {
        type: String
    },
    department: {
        type: String,
        enum: ['COOKING', 'CLEANING']
    },
    role: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps : true });

bachelorschema.methods.generateAuthToken = async function () {
    const bachelor = this
    const token = await jwt.sign({ _id: bachelor._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: '12h'
    })
    return token;
}

bachelorschema.statics.findByCredentials = async (email, password) => {
    const bachelor = await Bachelor.findOne({ email });
    if(!bachelor) {
        throw new Error('Invalid Credentials');
    }
    if(bachelor.status == false) {
        throw new Error('Access Denied')
    }
    const check =  await bcrypt.compare(password, bachelor.password);
    if(!check) {
        throw new Error('Invalid Credentials')
    }
    return bachelor;
}

bachelorschema.pre('save', async function() {
    const bachelor = this 
    if(bachelor.isModified('password')) {
        bachelor.password = await bcrypt.hash(bachelor.password, 8)
    }
})

let Bachelor = mongoose.model('bachelor', bachelorschema);

module.exports = Bachelor;