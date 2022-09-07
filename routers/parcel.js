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


    // createOne: function (req, res) {
    //     let newMovieDetails = req.body;
    //     newMovieDetails._id = new mongoose.Types.ObjectId();
    //     Movie.create(newMovieDetails, function (err, movie) {
    //         if (err) return res.status(400).json(err);

    //         res.json(movie);
    //     });
    // },


    // getOne: function (req, res) {
    //     Movie.findOne({ _id: req.params.id })
    //         .populate('actors')
    //         .exec(function (err, movie) {
    //             if (err) return res.status(400).json(err);
    //             if (!movie) return res.status(404).json();

    //             res.json(movie);
    //         });
    // },


    updateOne: function (req, res) {
        Parcel.findOneAndUpdate({ _id: req.body.id }, {address:req.body.address}, function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();

            res.json();
        });
    }
};



