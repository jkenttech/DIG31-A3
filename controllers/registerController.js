import { _log } from '../app.js';
import * as _config from '../utils/config.js';

export function root(req, res){
    _log.write_request(req);
    let messages = { };
    res.render('register', { errors: messages });
}

export function root_post(req, res){
    _log.write_request(req);
    _log.write(_log.INF, JSON.stringify(req.body));

    let messages = { };
    if(!req.body.email){
        messages.email = "No email provided";
	_log.write(_log.ERR, messages.email);
    };
    if(!req.body.password){
        messages.password = "No password provided";
	_log.write(_log.ERR, messages.password);
    };
    if(!req.body.passwordConfirm){
        messages.passwordConfirm = "Reenter the password";
	_log.write(_log.ERR, messages.passwordConfirm);
    } else if(req.body.passwordConfirm != req.body.password){
        messages.passwordConfirm = "Passwords do not match";
	_log.write(_log.ERR, messages.passwordConfirm);
    };

    _log.write(_log.DBG, `length of messages is ${Object.keys(messages).length}`);
    if(Object.keys(messages).length > 0){
        return res.render('register', { errors: messages });
    } else {
        return res.redirect(_config.loginEndpoint);
    }
}
