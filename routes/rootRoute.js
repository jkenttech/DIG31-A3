import express from 'express';
import * as _config from '../utils/config.js';
import * as _controller from '../controllers/rootController.js';
import * as _apiController from '../controllers/rootApiController.js';

export const router = express.Router();

router.get(_config.rootEndpoint, (req, res)=>{
    _controller.root(req, res);
});

router.get(_config.api(_config.rootEndpoint), (req, res)=>{
    _apiController.root(req, res);
});

