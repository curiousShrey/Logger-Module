/**
 * @author shreyansh joshi
 */
const fs = require('fs');
const chalk = require('chalk');
let logLevelPriority = 0;
//Getting current date and time using Date() object.
let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + ' ' + time;
//DEFAULT CONFIGURATION  OF LOGGER
let defaultConfig = {
    logLocation: ["file", "console"],
    logLevel: "TRACE",
    logfile: "log.txt"
};
//Properties OF DIFFRENT LOG LEVELS
const logLevelProperties = {
    ERROR: ['ERROR', 3, 'red'],
    WARN: ['WARN', 4, 'yellow'],
    INFO: ['INFO', 5, 'green'],
    DEBUG: ['DEBUG', 6, 'blue'],
    TRACE: ['TRACE', 7, 'white'],
    ALL: ['ALL', 999, ""],
    NONE: ['NONE', -1, ""]
};
if (fs.existsSync('config.json') == true) {
    let configData = require('./config.json');
    defaultConfig = configData;
}
let logArray = Object.keys(logLevelProperties); //Returns array of object keys.
//Sets the priority value of the log level mentioned in default config.
for (let i = 0; i < logArray.length; i++) {
    if (logArray[i] == defaultConfig.logLevel && logArray[i] != 'ALL' && logArray[i] != 'NONE')
        logLevelPriority = i + 3;
    if (logArray[i] == defaultConfig.logLevel && logArray[i] == 'ALL')
        logLevelPriority = 999;
    if (logArray[i] == defaultConfig.logLevel && logArray[i] == 'NONE')
        logLevelPriority = -1;
}
/**
 * This method is invoked by different log level methods and process the writing
 * part on file, console or both based on the condition defined in configuration.
 * @param {object} logtype 
 * @param {object} message 
 **/
function processLog(logtype, message) {
    if (typeof message == 'object') {
        message = JSON.stringify(message);
    }
    if (defaultConfig.logLocation[0] == 'file') {
        fs.appendFileSync('./log.txt', dateTime + "-[" + logtype[0] + "]-" + message + '\n', (err) => {
            if (err) throw err;
        });
    }
    if (defaultConfig.logLocation[1] == 'console') {
        console.log(chalk.keyword(logtype[2])(dateTime + "-[" + logtype[0] + "]-" + message + "\n"));
    }
}
module.exports = {
    error: (msg) => {
        if (logLevelPriority >= 3) {
            processLog(logLevelProperties.ERROR, msg);
        }
    },
    warn: (msg) => {
        if (logLevelPriority >= 4)
            processLog(logLevelProperties.WARN, msg);
    },
    info: (msg) => {
        if (logLevelPriority >= 5) {
            processLog(logLevelProperties.INFO, msg);
        }
    },
    debug: (msg) => {
        if (logLevelPriority >= 6) {
            processLog(logLevelProperties.DEBUG, msg);
        }
    },
    trace: (msg) => {
        if (logLevelPriority >= 7) {
            processLog(logLevelProperties.TRACE, msg);
        }
    }
}