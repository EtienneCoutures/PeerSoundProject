'use strict';
var Sequelize = require('sequelize'),
    extend    = require('deep-extend'),
    logger    = require('../logger');

var config  = {
        db: {
            dbname: "peersoundproject",
            host: "localhost",
            user: "itiz",
            pw: "judelapoire",
            port: "3306"
        },
        mailer: {
            transporter: {
                sendmail: true
            },
            defaults: {
                from: {
                    name: 'peersoundproject',
                    address: 'peersoundproject@domain.com'
                }
            }
        },
        servers: {
            self: {
                protocol: "https",
                host: "peersoundproject.com"
            }
        },
        session: {
            secure: false,
            timeout: 3600 * 1000, // 1 hours
            remember: 7 * 24 * 3600 * 1000 // 7 days
        },
        logger: {
            console: {
                enable: false
            },
            file: {
                enable: true,
                filename: 'server'
            }
        }
    },
    configs = {
        prod: {},
        development: {
            servers: {
                self: {
                    protocol: "https",
                    host: false
                }
            },
            logger: {
                console: {
                    enable: true
                },
                file: {
                    enable: true
                }
            }
        }
    };

module.exports = function (options) {
    extend(config, configs[options.env] || configs['development']);

    if (config.servers.self.host === false) {
        config.servers.self.host = 'localhost:' + options.port;
    }
    for (var i in config.servers) {
        if (config.servers.hasOwnProperty(i)) config.servers[i].baseURL = config.servers[i].protocol + '://' + config.servers[i].host;
    }

    config.env = options.env;
    global.logger = logger(config.logger);

    global.sequelize = new Sequelize("peersoundproject", config.db.user, config.db.pw, {
        host: config.db.host,
        port: config.db.port,
        logging: false
    });

    return config;
};
