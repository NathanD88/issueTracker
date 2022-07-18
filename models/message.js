const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    text: {
        type: String,
        require: true
    },
    sent: {
        type: Date,
        default: Date.now()
    },
    read: {
        type: Boolean,
        default: false
    }
})

const Message = mongoose.model('Message', messageSchema, 'messages');
module.exports = Message;