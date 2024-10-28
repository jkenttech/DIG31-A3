import { Logger as _logger } from '../utils/tools.js';

export function root(req, res, endpoint){
    _logger.log("DBG", "root test");
    res.send(endpoint);
}
