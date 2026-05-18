const axios = require('axios');
const captainModel = require('../models/captain.model');
const rideModel = require('../models/ride.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {


        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getShareRideMatches = async ( pickup,destination, vehicleType, delayConstraint) =>{
        console.log('getShareRideMatches called with:', { pickup, destination, vehicleType, delayConstraint });
        if (!pickup || !destination || !vehicleType || delayConstraint === undefined) {
        throw new Error('All fields are required');
    }
    const rides = await rideModel.find({
        sharing: true,
        captain: { $ne: null },
        status: { $in: [ 'accepted', 'ongoing' ] }
    }).lean();

    const matches = [];

    for (const oldRide of rides) {
        try {
            const captain = await captainModel.findById(oldRide.captain).lean();
            if (!captain) continue;
            if (vehicleType && captain.vehicle && captain.vehicle.vehicleType !== vehicleType) continue;

            const driverLoc = `${captain.location.ltd},${captain.location.lng}`;

            const getSec = async (orig, dest) => {
                const res = await module.exports.getDistanceTime(orig, dest);
                return res && res.duration && res.duration.value ? res.duration.value : 0; // seconds
            }

            const t_driver_oldDest = await getSec(driverLoc, oldRide.destination);
            const t_driver_newPickup = await getSec(driverLoc, pickup);
            const t_newPickup_oldDest = await getSec(pickup, oldRide.destination);
            const t_oldDest_newDest = await getSec(oldRide.destination, destination);
            const t_newPickup_newDest = await getSec(pickup, destination);
            const t_newDest_oldDest = await getSec(destination, oldRide.destination);

            // Scenario 1: delayA = (driver -> newPickup -> oldDest) - (driver -> oldDest)
            const delayA = (t_driver_newPickup + t_newPickup_oldDest) - t_driver_oldDest;

            // routeA_extra: pickup -> oldDest -> newDest total travel time
            const routeA_extra = t_newPickup_oldDest + t_oldDest_newDest-t_newPickup_newDest;

            // Scenario 2: driver -> newPickup -> newDest -> oldDest - (driver -> oldDest)
            const delay2 = (t_driver_newPickup + t_newPickup_newDest + t_newDest_oldDest) - t_driver_oldDest;

            const rideConstraintSec = (oldRide.sharingDelayConstraint || 0) * 60;
            const providedConstraintSec = (delayConstraint || 0) * 60;

            // Accept if any of the described conditions are met:
            // - Scenario1: delayA <= oldRide.sharingDelayConstraint AND routeA_extra <= provided delayConstraint
            // - Scenario2: delay2 <= oldRide.sharingDelayConstraint
            if ((delayA <= rideConstraintSec && routeA_extra <= providedConstraintSec) || delay2 <= rideConstraintSec) {
                matches.push({
                    rideId: oldRide._id,
                    captainId: captain._id,
                    socketId: captain.socketId,
                    driverLocation: captain.location,
                    delayA,
                    routeA_extra,
                    delay2,
                    rideConstraintSec,
                    providedConstraintSec
                });
            }
        } catch (err) {
            console.error('Error evaluating share match for ride', oldRide._id, err);
            continue;
        }
    }

    return matches;
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km

    // Calculate bounding box for initial filtering
    const latDelta = radius / 111; // 1 degree latitude ≈ 111 km
    const lngDelta = radius / (111 * Math.cos(ltd * Math.PI / 180));

    const captains = await captainModel.find({
        'location.ltd': { $gte: ltd - latDelta, $lte: ltd + latDelta },
        'location.lng': { $gte: lng - lngDelta, $lte: lng + lngDelta }
    });

    return captains;

}


