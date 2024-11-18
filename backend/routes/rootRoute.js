import express from 'express';
import * as _config from '../utils/config.js';

export const router = express.Router();

router.get(_config.rootEndpoint, (req, res)=>{
    res.send("in root");
});

