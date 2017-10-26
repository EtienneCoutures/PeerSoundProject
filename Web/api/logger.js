'use strict';
var winston,
    moment,
    extend,
    fs;

(function () {
    var libs = {},
        errors = [];

    [
        'winston',
        'moment',
        'deep-extend',
        'fs-extra'
    ].forEach(function (_package) {
            try {
                libs[_package] = require(_package);
            } catch (err) {
                errors.push(_package);
            }
        });
    if (errors.length > 0) throw new Error('Please install ' + errors.join(', ') + ' package(s) manually');

    winston = libs.winston;
    moment = libs.moment;
    extend = libs['deep-extend'];
    fs = libs['fs-extra'];
})();

module.exports = function (options) {
    var printTimestamp = function () {
        return moment.utc().format("DD-MM-YYYY HH:mm z");
    };
    options = extend({
        console: {
            enable: true,
            levels: {
                debug: true,
                info: false,
                error: false
            }
        },
        file: {
            enable: true
        }
    }, options || {});

    fs.ensureDirSync('logs');

    return new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                timestamp: printTimestamp,
                level: 'debug',
                name: 'debug-console',
                silent: !(options.console.enable && options.console.levels.debug),
                prettyPrint: true,
                colorize: true
            }),
            new (winston.transports.Console)({
                timestamp: printTimestamp,
                level: 'info',
                name: 'info-console',
                silent: !(options.console.enable && options.console.levels.info),
                colorize: true
            }),
            new (winston.transports.Console)({
                timestamp: printTimestamp,
                level: 'error',
                name: 'error-console',
                silent: !(options.console.enable && options.console.levels.error),
                colorize: true
            }),
            new (winston.transports.File)({
                timestamp: printTimestamp,
                level: 'silly',
                name: 'file',
                filename: 'logs/' + (options.file.filename || 'server') + '.log',
                maxsize: 50 * 1024 * 1024,
                rotationFormat: function() {
                    return moment.utc().format("_YYYY-MM-DD_HH-mm-ss");
                },
                silent: !options.file.enable,
                json: false
            })
        ]
    });
};
