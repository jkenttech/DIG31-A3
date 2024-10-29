import express from 'express';
import * as _config from './utils/config.js';
import { router as _rootRoute } from './routes/rootRoute.js';
import { router as _loginRoute } from './routes/loginRoute.js';
import { Logger } from './utils/tools.js';

const app = express();
export const router = express.Router();
export const _log = new Logger();

const PORT = _config.port;
const IP = _config.ip;

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(PORT, IP, ()=>{
    _log.write(_log.INF, `app listening on ${PORT}`);

    // Root endpoints
    _log.write(_log.DBG, `Available root endpoints: {\n\t${_config.rootEndpoint}\n\t${_config.api(_config.rootEndpoint)}\n}`);
    app.use(_config.rootEndpoint, _rootRoute);
    app.use(_config.api(_config.rootEndpoint), _rootRoute);

    // Login endpoints
    _log.write(_log.DBG, `Available root endpoints: {\n\t${_config.loginEndpoint}\n\t${_config.api(_config.loginEndpoint)}\n}`);
    app.use(_config.loginEndpoint, _loginRoute);
    app.use(_config.api(_config.loginEndpoint), _loginRoute);
});

