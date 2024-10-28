import express from 'express';
import * as _config from './utils/config.js';
import { router as _rootRoute } from './routes/rootRoute.js';

const app = express();
export const router = express.Router();

const PORT = _config.port;

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`);

    // Root endpoints
    app.use(_config.rootEndpoint, _rootRoute);
    app.use(_config.api(_config.rootEndpoint), _rootRoute);
});

