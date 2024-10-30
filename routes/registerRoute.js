import express from 'express';
import * as _config from '../utils/config.js';
import * as _controller from '../controllers/registerController.js';
import * as _apiController from '../controllers/registerApiController.js';

export const router = express.Router();

////////////////////
// Root endpoints //
router.get(_config.rootEndpoint, (req, res)=>{
    _controller.root(req, res);
});

router.post(_config.rootEndpoint, (req, res)=>{
    _controller.root_post(req, res);
});

// API
router.get(_config.api(_config.rootEndpoint), (req, res)=>{
    _apiController.root(req, res);
});
// Root endpoints //
////////////////////

