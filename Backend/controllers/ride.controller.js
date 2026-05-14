const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        console.log('createRide - req.user:', req.user);
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        console.log('createRide - ride created:', ride._id);
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log('createRide - pickupCoordinates:', pickupCoordinates);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        console.log('createRide - captainsInRadius:', captainsInRadius.length, captainsInRadius.map(c => ({ id: c._id, socketId: c.socketId, location: c.location })));

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(captain => {
            console.log('createRide - sending new-ride to captain:', captain._id, 'socketId:', captain.socketId);
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })

    } catch (err) {

        console.log('createRide error:', err);
        return res.status(500).json({ message: err.message });
    }

};

module.exports.shareRide = async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType, delayConstraint } = req.body;
    
    try{

    }catch(err){
        console.log('shareRide error:', err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    console.log('startRide - received request with rideId:', rideId, 'otp:', otp);

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } s
}