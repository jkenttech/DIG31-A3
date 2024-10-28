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

    write(level, string){
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
    let log = new Logger();
    log.write(log.TST, `Testing log levels`);
    log.write(log.INF, `INF log level`);
    log.write(log.DBG, `DBG log level`);
    log.write(log.WRN, `WRN log level`);
    log.write(log.ERR, `ERR log level`);
    log.write(log.CRT, `CRT log level`);
})();

