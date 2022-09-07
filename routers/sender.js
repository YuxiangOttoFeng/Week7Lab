const mongoose = require('mongoose');

const Sender = require("../models/sender");
const Parcel = require("../models/parcel");

module.exports = {

    // getAll: function (req, res) {
    //     Actor.find(function (err, actors) {
    //         if (err) {
    //             return res.status(404).json(err);
    //         } else {
    //             res.json(actors);
    //         }
    //     });
    // },

    createOne: function (req, res) {
        let newSenderDetails = req.body;
        newSenderDetails._id = new mongoose.Types.ObjectId();

        let sender = new Sender(newSenderDetails);
        sender.save(function (err) {
            res.json(sender);
        });
    },

    //Task 1
    getOne: function (req, res) {
        Sender.findOne({ name: req.params.name })
            .populate('parcels')
            .exec(function (err, sender) {
                if (err) return res.status(400).json(err);
                if (!sender) return res.status(404).json();
                res.json(sender);
            });
    },


    updateOne: function (req, res) {
        Sender.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            res.json(sender);
        });
    },


    deleteOne: function (req, res) {
        Sender.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    addParcel: function (req, res) {
        Sender.findOne({ _id: mongoose.Types.ObjectId(req.body.id) }, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            let newParcelDetails = req.body.parcel;
            newParcelDetails._id = new mongoose.Types.ObjectId();
            newParcelDetails.sender = sender._id;
            Parcel.create(newParcelDetails);
        });
        Sender.findOne({ _id: mongoose.Types.ObjectId(req.body.id) }, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            // console.log("!!!!");
            Parcel.findOne({ sender: sender._id }, function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
                
                // console.log("$$$");
                sender.parcels.push(parcel._id);
                sender.save(function (err) {
                    if (err) return res.status(500).json(err);
    
                    // res.json(sender);
                });
            });
        });
        Sender.findOne({ _id: mongoose.Types.ObjectId(req.body.id) })
        .populate('parcels')
        .exec(function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();
            res.json(sender);
        });
    }


};




