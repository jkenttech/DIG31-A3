import express from 'express';
import * as _config from '../utils/config.js';
import { _log } from '../app.js';
import { Vehicle } from '../models/Vehicle.js';
import { Trip } from '../models/Trip.js';

export const router = express.Router();

router.post(_config.rootEndpoint, (req, res)=>{
    _log.write(_log.INF, `JSON ${JSON.stringify(req.body)}`);

    if(Object.keys(req.body).length === 0){   
        return res.status(400).send({message: "Vehicle content can not be empty"})
    }

    // check account with email doen't already exist
    Vehicle.findOne({registration: req.body.registration})
    .then(vehicle => {
        if( vehicle != null && vehicle.email == req.body.email ){
        return res.status(400).json({
            message: "You have already added this vehicle"
        })
        }
    // create new user       
    let newVehicle = new Vehicle(req.body)
    newVehicle.save()
        .then(vehicle => {        
        // success!  
        // return 201 status with user object
        return res.status(201).json(vehicle)
        })
        .catch(err => {
        console.log(err)
        return res.status(500).send({
            message: "Problem adding vehicle to your account",
            error: err
        })
        })
    })
});

router.get("/:registration", (req,res)=>{
    Vehicle.findOne({registration: req.params.registration})
    .then(async dbVehicle => res.send(dbVehicle));
})

router.get("/:registration/trips", (req,res)=>{
    Trip.find({registration: req.params.registration})
    .then(async dbTrips => res.send(dbTrips));
})
