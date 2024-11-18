// external imports
import express from 'express';

// local imports
import * as _config from './utils/config.js';
import { Logger } from './utils/tools.js';
export const _log = new Logger();

const app = express();
export const router = express.Router();

// setup routes
import { router as _rootRoute } from './routes/rootRoute.js';

const _port = _config.port;
const _ip = _config.ip;

app.listen(_port, _ip, ()=>{
    _log.write(_log.INF, `app listening on ${_ip}:${_port}`);

    // list available endpoints in debug log
    let endpoints = 'Available endpoints: {\n';
    endpoints += `\t${_config.rootEndpoint} [GET]\n`;
    endpoints += '}';
    _log.write(_log.DBG, `${endpoints}`);

    app.use(_config.rootEndpoint, _rootRoute);

    // throw 404 if no route is found
    app.use((req, res)=>{ res.status(404).send('404') });
});

