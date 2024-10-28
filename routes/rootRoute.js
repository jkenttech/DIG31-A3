import express from 'express';
import * as _config from '../utils/config.js';
import * as _controller from '../controllers/rootController.js';

export const router = express.Router();

router.get(_config.rootEndpoint, (req, res)=>{
    _controller.root(req, res, "[GET]", _config.rootEndpoint);
});

router.get(_config.api(_config.rootEndpoint), (req, res)=>{
    res.send(_config.api(_config.rootEndpoint));
});

