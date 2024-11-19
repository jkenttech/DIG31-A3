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

const app = express();
export const router = express.Router();

// setup routes
import { router as _rootRoute } from './routes/root.js';
import { router as _userRoute } from './routes/user.js';

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

    // throw 404 if no route is found
    app.use((req, res)=>{ res.status(404).send('404') });
}))
.catch((error)=>{ _log.write(_log.CRT, `${error}\nExiting application.`) });

function seedDB(){
    let seedUsers = JSON.parse(readFileSync("./SeedUsers.json"));

    seedUsers.forEach(async (user) => {
        await User.create(user);
    });

    _log.write(_log.INF, "Database seeded.");
}
