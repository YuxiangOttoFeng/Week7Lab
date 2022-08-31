//Import packages
const express = require("express");
const mongodb = require("mongodb");
const mongoose = require('mongoose');
const morgan = require("morgan");
const ejs = require("ejs");
const path = require('path');
//Configure Express
const app = express();

const Parcel = require('./models/parcel');

const url = 'mongodb://localhost:27017/week6LabDB';

app.listen(8080);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/css",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")));
app.use(express.static("public/imgs"));
app.use(express.static("public/css"));
app.use(express.json());
app.engine("html",require("ejs").renderFile);
app.set("view engine","html");




mongoose.connect(url,function(err){
    if(err === null){
        console.log('Connected successfully!');
    }
    else{
        console.log(err);
    }
});


//index.html
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"views/index.html"));
});

//add new parcel
app.get('/newparcel',(req,res)=>{
    res.sendFile(path.join(__dirname,"views","newparcel.html"));
});
app.post('/newparcelpost',(req,res)=>{
    let aParcel = req.body;
    let parcelObj = new Parcel({sender:aParcel.sender,
                                address:aParcel.address,
                                weight:aParcel.weight,
                                isFeagile:aParcel.isFeagile});
    parcelObj.save(function(err){
        if(err){
            console.log('Unable to save '+err);
        }
        else{
            res.redirect('/');
        }
    });
    
});


//Delete
app.get('/delparcel',function(req,res){
    res.sendFile(path.join(__dirname,"views","delbyidorsender.html"));
});
app.post('/delparcelpost',function(req,res){
    let id = req.body.id;
    Parcel.findByIdAndDelete(id,function(err){
        if(err) {
            console.log(err);
        }
        else{
            console.log("Delete Successfully!");
            res.redirect('/');
        }
    });
    
})
app.post('/delparcelpostbysender',function(req,res){
    let sender = req.body.sender;
    Parcel.findOneAndDelete({sender:sender},function(err){
        if(err) {
            console.log(err);
        }
        else{
            console.log("Delete Successfully!");
            res.redirect('/');
        }
    });
    
});


//Update
app.get("/updateparcel", function (req, res) {
    res.sendFile(__dirname + "/views/updateparcel.html");
  });
//POST request: receive the details from the client and do the update
app.post("/updateparcelpost", function (req, res) {
    let userDetails = req.body;
    let id = userDetails.oldID;
    let theUpdate = {
      $set: {
        sender: userDetails.newsender,
        address: userDetails.newaddress,
        weight: userDetails.newweight,
        isFeagile:userDetails.newisfeagile
      },
    };
    Parcel.findByIdAndUpdate(id,theUpdate,function(err){
        if(err) {
            console.log(err);
        }
        else{
            console.log("Update Successfully!");
            res.redirect('/');// redirect the client to list users page
        }
    });
});


//list all parcel
app.get("/selectgetparcel",function(req,res){
    res.sendFile(__dirname+"/views/selectgetparcel.html");
});
app.post('/getallparcel',function(req,res){
    Parcel.find({},function(err,result){
        if(err){
            console.log(err);
        }
        else{
            res.render("getallparcel",{db_list:result});
        }
        
    });
});
app.post('/getallparcelbysender',function(req,res){
    let sender = req.body.sender;
    Parcel.find({sender:sender},function(err,result){
        if(err){
            console.log(err);
        }
        else{
            res.render("getallparcel",{db_list:result});
        }
        
    });
});
app.post('/getallparcelbyweightrange',function(req,res){
    let minVal = req.body.min;
    let maxVal = req.body.max;
    Parcel.find({weight:{$lte:maxVal,$gte:minVal}},function(err,result){
        if(err){
            console.log(err);
        }
        else{
            res.render("getallparcel",{db_list:result});
        }
    });
});




app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"views/404.html"));
});

