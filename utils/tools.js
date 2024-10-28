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
	this.TST = 6;
        this.DBG = 5;
        this.INF = 4;
        this.WRN = 3;
        this.ERR = 2;
        this.CRT = 1;
    }

    log(level, string){
        if(level == this.TST){ this.colour = testColour; }
        if(level == this.DBG){ this.colour = debugColour; }
        if(level == this.INF){ this.colour = informationColour; }
        if(level == this.WRN){ this.colour = warningColour; }
        if(level == this.ERR){ this.colour = errorColour; }
        if(level == this.CRT){ this.colour = criticalColour; }
        console.log(`\x1b[${this.colour}${level} ${new Date().toString().split(" GMT")[0]} ${string}\x1b[${this.white}`);
    }

}

(function logger_test(){
    let logger = new Logger();
    logger.log(logger.TST, `Testing log levels`);
    logger.log(logger.INF, `INF log level`);
    logger.log(logger.DBG, `DBG log level`);
    logger.log(logger.WRN, `WRN log level`);
    logger.log(logger.ERR, `ERR log level`);
    logger.log(logger.CRT, `CRT log level`);
})();

