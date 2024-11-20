import express from 'express';
import * as _config from '../utils/config.js';
import { _log } from '../app.js';
import { User } from '../models/User.js';
import { Vehicle } from '../models/Vehicle.js';
import { Utils } from '../utils/tools.js'

export const router = express.Router();

router.post(_config.rootEndpoint, (req, res)=>{
    _log.write(_log.INF, `JSON ${JSON.stringify(req.body)}`);

    if(Object.keys(req.body).length === 0){   
        return res.status(400).send({message: "User content can not be empty"})
    }

    // check account with email doen't already exist
    User.findOne({email: req.body.email})
    .then(user => {
        if( user != null ){
        return res.status(400).json({
            message: "email already in use, use different email address"
        })
        }
    // create new user       
    let newUser = new User(req.body)
    newUser.save()
        .then(user => {        
        // success!  
        // return 201 status with user object
        return res.status(201).json(user)
        })
        .catch(err => {
        console.log(err)
        return res.status(500).send({
            message: "Problem creating account",
            error: err
        })
        })
    })
});

router.put(_config.rootEndpoint, (req, res)=>{
    _log.write(_log.INF, `JSON ${JSON.stringify(req.body)}`);

    if(Object.keys(req.body).length === 0){   
        return res.status(400).send({message: "Profile content can not be empty"})
    }

    // check account with email doen't already exist
    User.findOne({email: req.body.email})
    .then(user => {
        if(!Utils.verifyHash(req.body.password, user.password)){
        return res.status(400).json({
            message: "incorrect password supplied"
        })
        } else if(req.body.newPassword != req.body.newPasswordConfirm){
        return res.status(400).json({
            message: "new password fields do not match"
        })
        }
    
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.newPassword;

    // update profile       
    user.save()
        .then(user => {        
        // success!  
        // return 201 status with user object
        return res.status(201).json(user)
        })
        .catch(err => {
        console.log(err)
        return res.status(500).send({
            message: "Problem updating profile",
            error: err
        })
        })
    })
});

router.get("/vehicles/:email", (req,res)=>{
    Vehicle.find({email: req.params.email})
    .then(async dbVehicles => res.send(dbVehicles));
})
