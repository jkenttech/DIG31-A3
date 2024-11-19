import express from 'express';
import * as _config from '../utils/config.js';
import { _log } from '../app.js';
import { Trip } from '../models/Trip.js';

export const router = express.Router();

router.post(_config.rootEndpoint, (req, res)=>{
    _log.write(_log.INF, `JSON ${JSON.stringify(req.body)}`);

    if(Object.keys(req.body).length === 0){   
        return res.status(400).send({message: "Trip content can not be empty"})
    }

    let newTrip = new Trip(req.body)
    newTrip.save()
        .then(trip => {        
        // success!  
        // return 201 status with user object
        return res.status(201).json(trip)
        })
        .catch(err => {
        console.log(err)
        return res.status(500).send({
            message: "Error adding trip",
            error: err
        })
    })
});

router.get("/:id", (req,res)=>{
    Trip.findOne({_id: req.params.id})
    .then(async dbTrip => res.send(dbTrip));
})
