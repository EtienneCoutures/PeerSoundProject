/**
 * Main file
 */
var express        = require('express'),
    app            = express(),
    fs             = require('fs-extra'),
    hskey          = fs.readFileSync('./hacksparrow-key.pem'),
    hscert         = fs.readFileSync('./hacksparrow-cert.pem'),
    https_options  = {
      key: hskey,
      cert: hscert
    },
    server         = require('https').createServer(https_options, app),

    session        = require('express-session'),
    flash          = require('express-flash'),
    bodyParser     = require('body-parser'),
    Cookies        = require('cookies'),
    locale         = require('locale'),

    passport       = require('passport'),
    async          = require('async'),
    _              = require('underscore'),
    Promise        = require('bluebird'),
    glob           = require('glob'),
    S              = require('string'),
    nodemailer     = require('nodemailer'),
    path           = require('path'),

    translate      = require('./translate')(path.resolve('./i18n'), 'en'),
    logger;

app.requirePermission = require('./permissionRules')({
    redirectUrl: '/',
    passwordStrategies: 'bearer',
    userProperty: 'account',
    rolenameProperty: 'usr_role'
});

// get node arguments
var options = {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || 'development'
};
for (var i = 2; i < process.argv.length; i++) {
    var arg = process.argv[i].split('=');
    switch (arg[0]) {
        case '-help':
            console.log('options: ' + Object.keys(options).map(function (key) {
                return '[' + key + '=<' + key + '>]';
            }).join(' '));
            return;
        default:
            options[arg[0]] = arg[1];
            break;
    }
}

async.eachSeries([
    initExpress,
    initModels,
    initRoutes,
    loadServices,
    startServeur
], function (fct) {
    fct.apply(null, Array.prototype.slice.call(arguments).slice(1));
}, function (err) {
    if (err) {
        logger.error("Exit - Error occurred.");
    }
});

function initExpress(callback) {
    var languages = fs.readdirSync('i18n');

    app.config = require('./config/main')(options);
    logger = global.logger;
    logger.info('options set:', options);

    app.mailer = nodemailer.createTransport(app.config.mailer.transporter, app.config.mailer.defaults);
    Promise.promisifyAll(app.mailer);
    app.set('views', 'views');
    app.use(flash());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs');
    app.use(express.static('public'));

    app.use(session({
        key: 'connect.sid',
        secret: '6eL6vayZ',
        // resave: true,
        rolling: true,
        saveUninitialized: true,
        cookie: {
            secure: !!app.config.session.secure,
            maxAge: app.config.session.timeout
        }
    }));

    app.use(passport.initialize({
        userProperty: 'account'
    }));
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    app.all('/i18n/:lang/:part', function (req, res) {
        fs.access('./i18n/' + req.params.lang + '/' + req.params.part, function (err) {
            if (!err) return res.sendFile(__dirname + '/i18n/' + req.params.lang + '/' + req.params.part);
            res.status(404).end();
        });
    });
    app.all('/node_modules/*', function (req, res) {
        fs.access(__dirname + req.url, function (err) {
            if (!err) return res.sendFile(__dirname + req.url);
            res.status(404).end();
        });
    });

    app.use(function (req, res, next) {
        var cookie = new Cookies(req, res),
            authorization = cookie.get("authorization"),
            locales = new locale.Locales(req.headers["accept-language"]),
            lang = cookie.get("preferredLanguage") || locales.best(new locale.Locales(languages)).language || 'en';

        if (authorization && !req.query.access_token) req.headers.authorization = authorization;
        if (req.lang) lang = req.lang;
        req.lang = lang;

        req.translate = function (category, message, params, language) {
            return translate(category, message, params, language || lang);
        };
        next();
    });
    app.all('/partials/*', function (req, res) {
        var template = req.url.substr(10);

        fs.access(app.get('views') + '/' + template + '.ejs', function (err) {
            if (!err) return res.render(template, {
                translate: req.translate
            });
            res.status(404).end();
        });
    });

    app.use(function(req, res, next) {
        if (req.originalUrl == '/signup' || app.requireSignUp === false) return next();

        app.models['User'].count().then(function (count) {
            if (count == 0) return res.redirect('/signup');

            app.requireSignUp = false;
            next();
        }).catch(next);
    });
    app.all('*', function (req, res, next) {
        var render = res.render;

        logger.verbose('(' + req.method + ') ' + req.originalUrl);

        req.session.cookie.expires = new Date(Date.now() + app.config.session.timeout);
        req.session.save();

        res.render = function (view, locals, callback) {
            locals = locals || {};
            locals.__account = req.account || app.models['User'].build();
            locals._lang = req.lang;
            locals.translate = req.translate;

            render.apply(res, [view, locals, callback]);
        };

        next();
    });
    glob('./passport/*.js', function (err, files) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            async.each(files, function (file, callback) {
                require(file)(app, passport);
                callback();
            }, callback);
        }
    });
}

function initModels(callback) {
    app.models = {};
    glob('./models/*.js', function (err, files) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            async.each(files, function (file, callback) {
                require(file)(app);
                callback();
            }, callback);

            sequelize.sync({alter : true
            , /*force : true,*/ logging : console.log});
        }
    });
}

function initRoutes(callback) {
    glob('./routes/*.js', function (err, files) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            async.each(files, function (file, callback) {
                require(file)(app);
                callback();
            }, function () {
                app.all('*', function (req, res, next) {
                    var error = new Error();
                    error.status = 404;
                    next(error);
                });

                app.use(function (err, req, res, next) {
                    switch (err.status) {
                        case 401: // Not connected
                        case 403: // Forbidden
                        case 404: // Not found
                            if (req.originalUrl.match(/^\/api\//)) {
                                return res.json({
                                    code: err.code || -2,
                                    message: err.message || req.translate('system', 'ERROR_ROUTE')
                                });
                            }
                            if (req.originalUrl.match(/^\/(css)|(js)|(plugins)|(upload)|(img)\//)) {
                                return res.status(404).end();
                            }
                            res.status(err.status).redirect('/');
                            break;
                        default:
                            console.log(err);
                            res.status(400).json(err);
                            break;
                    }
                });
                callback();
            });
        }
    });
}

function loadServices(callback) {
    app.services = {};
    glob('./services/*.js', function (err, files) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            async.each(files, function (file, callback) {
                require(file)(app);
                callback();
            }, callback);
        }
    });
}

function startServeur(callback) {
    server.listen(options.port);
    /*sequelize.sync().then(function() {
      console.log('sequelize is sync')
    }).catch(function(err) {
      console.log(err)
    })*/
    logger.info('Magic happens on port ' + options.port);
    callback();
}
