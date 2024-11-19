import * as _config from './config.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/* global console */

let white = "0m";
let colour = white;
let testColour = "0m";
let debugColour = "34m";
let informationColour = "32m";
let warningColour = "35m";
let errorColour = "33m";
let criticalColour = "31m";

export class Logger{
    constructor(){
	    this.white = white;
	    this.colour = colour;
	    this.TST = "TST";
        this.DBG = "DBG";
        this.INF = "INF";
        this.WRN = "WRN";
        this.ERR = "ERR";
        this.CRT = "CRT";
    }

    write(level, string){
        if(level == this.TST){ this.colour = testColour; }
        if(level == this.DBG){ this.colour = debugColour; }
        if(level == this.INF){ this.colour = informationColour; }
        if(level == this.WRN){ this.colour = warningColour; }
        if(level == this.ERR){ this.colour = errorColour; }
        if(level == this.CRT){ this.colour = criticalColour; }
        console.log(`\x1b[${this.colour}${level} ${new Date().toString().split(" GMT")[0]} ${string}\x1b[${this.white}`);
    }

    write_request(req){
	this.write(this.INF, `${req.method} ${req.baseUrl}${req.path} ${req.ip}`);
    }
}

(function logger_test(){
    let log = new Logger();
    log.write(log.TST, `TST log level`);
    log.write(log.DBG, `DBG log level`);
    log.write(log.INF, `INF log level`);
    log.write(log.WRN, `WRN log level`);
    log.write(log.ERR, `ERR log level`);
    log.write(log.CRT, `CRT log level`);
})();

export class Utils {
    static hashPassword(password){
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
        return [salt, hash].join('$');
    }

    static verifyHash(password, original){
        const originalHash = original.split('$')[1];
        const salt = original.split('$')[0];
        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
        return hash === originalHash;
    }

    static generateAccessToken(user){
        return jwt.sign(user, _config.accessToken, { expiresIn: '7d'})
    }

    static authenticateToken(req, res, next){
        const authHeader = req.headers['authorization']        
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null){
            return res.status(401).json({
                message: "Unauthorised"
            })
        } 
        
        jwt.verify(token, _config.accessToken, (err, user) => {
            if(err) {
                return res.status(401).json({
                    message: "Unauthorised"
                })
            }
            req.user = user
            next()
        })
    }
}
