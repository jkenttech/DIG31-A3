import { _log } from '../app.js';

export function root(req, res){
    _log.write_request(req);
    res.render('index');
}
