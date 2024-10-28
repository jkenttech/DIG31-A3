import { _log } from '../app.js';

export function root(req, res, method, endpoint){
    _log.write(_log.INF, `${method} ${endpoint}`);
    res.send(endpoint);
}
