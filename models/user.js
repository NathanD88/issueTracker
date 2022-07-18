const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "Offline"
    },
    lastLogin: {
        type: Date
    }
})

const User = mongoose.model("User", userSchema, "users");
module.exports = User;