const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    gloveId: {
        type: String,
        required: true
    },
    issuedTo: {
        type: String,
        required: true
    },
    issuedDate: {
        type: Date,
        default: Date.now
    },
    returnedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['issued', 'returned'],
        default: 'issued'
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;