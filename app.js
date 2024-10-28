import express from 'express';
import * as _config from './utils/config.js';
import { router as _rootRoute } from './routes/rootRoute.js';
import { Logger } from './utils/tools.js';

const app = express();
export const router = express.Router();
export const _log = new Logger();

const PORT = _config.port;

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`);

    // Root endpoints
    app.use(_config.rootEndpoint, _rootRoute);
    app.use(_config.api(_config.rootEndpoint), _rootRoute);
});

