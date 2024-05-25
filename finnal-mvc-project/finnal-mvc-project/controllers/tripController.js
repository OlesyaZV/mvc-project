const Trip = require('../models/Trip');
const path = require('path');

let trips = [];

exports.getTriptsPage = (req, res) => {
    res.render('triplist', { trips });
};

exports.getAddTripPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'formNew.html'));
};

exports.addTrip = (req, res) => {
    const { description, date, transport, hotel } = req.body;
    trips.push(new Trip(description, date, transport, hotel));
    res.redirect('/');
};

exports.getEditTripPage = (req, res) => {
    const id = req.params.id;
    if (!trips[id]) {
        res.status(404).send('Trip not found');
    } else {
        const trip = trips[id];
        trip.id = id;
        res.render('formUpdate', { trip });
    }
};


exports.updateTrip = (req, res) => {
    const id = req.params.id;
    const { description, date, transport, hotel } = req.body;
    if (!trips[id]) {
        res.status(404).send('Trip not found');
    } else {
        trips[id].description = description;
        trips[id].date = date;
        trips[id].transport = transport;
        trips[id].hotel = hotel;
        res.redirect('/');
    }
};


exports.deleteTrip = (req, res) => {
    const id = req.params.id;
    if (!trips[id]) {
        res.status(404).send('Trip not found');
    } else {
        trips.splice(id, 1);
        res.redirect('/');
    }
};
