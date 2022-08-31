const mongooes = require('mongoose');

const parcelSchema = mongooes.Schema({
    _id: {type:mongooes.Schema.Types.ObjectId,auto:true},
    sender:{type:String,required:true},
    address:{type:String,required:true},
    weight:{type:Number,
        validate:{
            validator:function(weight){
                return (weight>=0 && parseInt(weight,10));
            },
            message:'Invalid weight!!'
        }},
    isFeagile:{type:Boolean,required:true},
});

module.exports = mongooes.model('Parcel',parcelSchema);


