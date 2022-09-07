const mongoose = require('mongoose');

const Sender = require("../models/sender");
const Parcel = require("../models/parcel");

module.exports = {

    getAll: function (req, res) {
        Parcel.find({ address:req.query.address })
            .populate('sender',{_id:1,name:1})
            .exec(function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
                res.json(parcel);
            });
    },


    updateOne: function (req, res) {
        Parcel.findOneAndUpdate({ _id: req.body.id }, {address:req.body.address}, function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();

            res.json();
        });
    },


    deleteOne: function (req, res) {
        Parcel.findOneAndRemove({ weight: req.body.weight }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },


};



