const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'Sender'
    },
    weight: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fragile:{
        type: Boolean,
        required:true
    }
    
});

module.exports = mongoose.model('Parcel', parcelSchema);

