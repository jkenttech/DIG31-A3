import { _log } from '../app.js';

export function root(req, res){
    _log.write_request(req);
    let messages = { };
    res.render('login', { errors: messages });
}

export function root_post(req, res){
    _log.write_request(req);
    let messages = { };
    messages.login = "No login provided";
    messages.password = "No password provided";
    res.render('login', { errors: messages });
}
