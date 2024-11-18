import express from 'express';
import * as _config from '../utils/config.js';
import { _log } from '../app.js';

export const router = express.Router();

router.post(_config.rootEndpoint, (req, res)=>{
    _log.write(_log.INF, `JSON ${JSON.stringify(req.body)}`);
    _log.write(_log.INF, `Body email ${req.body.email}`);
    res.status(200);
    res.send();
});

