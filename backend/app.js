// external imports
import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import formData from 'express-form-data';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';

// local imports
import * as _config from './utils/config.js';
import { Logger } from './utils/tools.js';
export const _log = new Logger();
import { User } from './models/User.js';
import { Vehicle } from './models/Vehicle.js';


// variables
const app = express();
export const router = express.Router();
const seedUserData = "./seeddata/seedUsers.json";
const seedVehicleData = "./seeddata/seedVehicles.json";
const seedTripData = "./seeddata/seedTrips.json";

// setup routes
import { router as _rootRoute } from './routes/root.js';
import { router as _userRoute } from './routes/user.js';
import { router as _authRoute } from './routes/auth.js';

const _port = _config.port;
const _ip = _config.ip;

_log.write(_log.DBG, `dbConnectionString = ${_config.dbConnectionString}`);
mongoose.connect(_config.dbConnectionString)
.then(app.listen(_port, _ip, ()=>{
    seedDB();

    _log.write(_log.INF, `app listening on ${_ip}:${_port}`);

    app.use(formData.parse());
    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());
    app.use('*', cors());
    app.use(_config.rootEndpoint, _rootRoute);
    app.use(_config.userEndpoint, _userRoute);
    app.use(_config.authEndpoint, _authRoute);

    // throw 404 if no route is found
    app.use((req, res)=>{ res.status(404).send('404') });
}))
.catch((error)=>{ _log.write(_log.CRT, `${error}\nExiting application.`) });

async function seedDB(){
    let dbUsers = await User.find({});
    dbUsers == "" ? await seedUsers() : _log.write(_log.DBG, "Users not seeded.");

    let dbVehicles = await Vehicle.find({});
    dbVehicles == "" ? await seedVehicles() : _log.write(_log.DBG, "Vehicles not seeded.");
}

async function seedUsers(){
    let seedUsers = JSON.parse(readFileSync(seedUserData));
    seedUsers.forEach(async (user) => {
        await User.create(user);
    });
    _log.write(_log.INF, "Users seeded.");
}

async function seedVehicles(){
    let seedVehicles = JSON.parse(readFileSync(seedVehicleData));
    seedVehicles.forEach(async (vehicle) => {
        await Vehicle.create(vehicle);
    });
    _log.write(_log.INF, "Vehicles seeded.");
}

async function seedTrips(){}
