import { _log } from '../app.js';
import { _config } from '../utils/config.js';

export function root(req, res){
    _log.write_request(req);
    let messages = { };
    messages.login = "No login provided";
    messages.password = "No password provided";
    messages.passwordConfirm = "No passwordConfirm provided";
    res.render('register', { errors: messages });
}

export function root_post(req, res){
    _log.write_request(req);
    _log.write(_log.INF, JSON.stringify(req.body));

    let messages = { };
    if(!req.body.email){
	_log.write(_log.ERR, "No email provided");
        messages.email = "No email provided";
    };
    if(!req.body.password){
	_log.write(_log.ERR, "No password provided");
        messages.password = "No password provided";
    };
    if(!req.body.passwordConfirm){
	_log.write(_log.ERR, "Reenter the password");
        messages.passwordConfirm = "Reenter the password";
    } else if(req.body.passwordConfirm != req.body.password){
	_log.write(_log.ERR, "Passwords do not match");
        messages.passwordConfirm = "Passwords do not match";
    };

    _log.write(_log.DBG, `length of messages is ${Object.keys(messages).length}`);
    if(Object.keys(messages).length > 0){
        return res.render('register', { errors: messages });
    } else {
        return res.redirect(_config.loginEndpoint);
    }
}
