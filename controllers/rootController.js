import { Logger as _log } from '../utils/tools.js';

export function root(req, res, endpoint){
    _log.write(_log.TST, "root test");
    res.send(endpoint);
}
