const mongoose = require('mongoose');

const senderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    parcels: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Parcel'
    }]

});

module.exports = mongoose.model('Sender', senderSchema);