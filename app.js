const express = require('express');
const mongoose = require('mongoose');

const senders = require('./routers/sender');
const parcels = require('./routers/parcel');

const app = express();

app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/parcels', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});


app.get('/sender/:name', senders.getOne);
app.post('/sender', senders.createOne);
app.delete('/sender', senders.deleteOne);
app.put('/sender', senders.updateOne);
app.post('/sender/parcel', senders.addParcel);
app.get('/sender/getall',senders.getAll);


// app.post('/sender', senders.createOne);
app.get('/parcel', parcels.getAll);
app.put('/parcel', parcels.updateOne);
app.delete('/parcel',parcels.deleteOne)

