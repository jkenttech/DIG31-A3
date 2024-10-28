import { _log } from '../app.js';

export function root(req, res){
    _log.write(_log.INF, `${req.method} ${req.path}`);
    res.send(req.path);
}
