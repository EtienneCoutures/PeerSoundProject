/**
 * Strategy for local connect
 */
var express       = require('express'),
    crypto        = require('crypto'),
    Cookies       = require('cookies'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, passport) {
    var router = express.Router();
    app.use('/', router);

    passport.use('login', new LocalStrategy({
                usernameField: 'login',
                passwordField: 'password',
                passReqToCallback: true
            },
        function (req, username, password, done) {
            app.models['User'].find({
                where: {
                    'usr_email': username
                }
            }).then(function (account) {
                if (!account) {
                    return done(null, false, req.flash('message', req.translate('system', 'User Not found.')));
                }
                if (!account.validatePassword(password)) {
                    return done(null, false, req.flash('message', req.translate('system', 'Invalid Password')));
                }
                return app.models.AccessToken.create({
                    'atok_token': crypto.randomBytes(32).toString('hex'),
                    'usr_id': account['usr_id'],
                    'atok_type': 'access'
                }).then(function (accessToken) {
                    var cookie = new Cookies(req, req.res);
                    cookie.set("authorization", 'Bearer ' + accessToken.atok_token);
                    req.res.header('Access-Control-Expose-Headers', 'authorization');
                    req.res.setHeader("authorization", 'Bearer ' + accessToken.atok_token);

                    account = account.toJSON();
                    account.accessTokenID = accessToken.atok_id;
                    return done(null, account);
                });
            }).catch(function (err) {
                return done(null, false, req.flash('message', req.translate('system',
                    err.errors ? err.errors.map(function (error) {
                        return req.translate('system', error.message);
                    }).join('\n')
                        : (req.translate('system', err.message) || JSON.stringify(err))
                )));
            });
        })
    );

    passport.use('signup', new LocalStrategy({
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            console.log(req.body);
            var form = req.body;
            console.log(username);
            app.models['User'].find({
                where: {
                    'usr_email': username
                }
            }).then(function (account) {
                console.log(account)
                if (account) {
                    return done(null, false, req.flash('message', req.translate('system', 'Account with same username already exist.')));
                }
                account = app.models['User'].build({
                    'usr_email' : username,
                    'usr_password' : password
                });

                account.save().then(function(account) {
                    return app.models.AccessToken.create({
                        'atok_token': crypto.randomBytes(32).toString('hex'),
                        'usr_id': account['usr_id'],
                        'atok_type': 'access'
                    }).then(function (accessToken) {
                        var cookie = new Cookies(req, req.res);
                        cookie.set("authorization", 'Bearer ' + accessToken.atok_token);

                        account = account.toJSON();
                        account.accessTokenID = accessToken.atok_id;
                        return done(null, account);
                    });
                }).catch(function (err) {
                    return done(null, false, req.flash('message', req.translate('system',
                        err.errors ? err.errors.map(function (error) {
                            return req.translate('system', error.message);
                        }).join('\n')
                            : (req.translate('system', err.message) || JSON.stringify(err))
                    )));
                });
            });
        })
    );

    router.post('/api/auth/login',
        function (req, res, next) {
            passport.authenticate('login', function (err, user, info, status) {
                if (!user) {
                    return res.json({
                        code: -1,
                        error: err ? err : undefined,
                        info: info,
                        errors: req.flash('message').map(function (message) {
                            return {message: message};
                        })
                    });
                }

                req.login(user, function () {
                    res.json({
                        code: 0,
                        account: user
                    });
                });
            })(req, res, next);
        });

    router.post('/signup',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res, next) {
            passport.authenticate('signup', function (err, user, info, status) {
                if (!user) {
                    return res.redirect('/signup');
                }
                req.login(user, function () {
                    res.redirect('/');
                });
            })(req, res, next);
        });

    router.post('/api/auth/lostpassword',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            var email = req.body.email;

            app.models['User'].find({
                where: {
                    'usr_email': email
                }
            }).then(function (account) {
                if (!account) {
                    req.flash('message', req.translate('system', 'No account found with this email address.'));
                    return res.json({
                        code: -1,
                        errors: req.flash('message').map(function (message) {
                            return {message: message};
                        })
                    });
                }

                return app.models.AccessToken.create({
                    'atok_token': crypto.randomBytes(32).toString('hex'),
                    'usr_id': account['usr_id'],
                    'atok_type': 'recovery'
                }).then(function (recoveryToken) {
                    console.log(recoveryToken);
                    app.mailer.sendMail({
                        to: email,
                        subject: req.translate('system', '[ peersoundproject ] - lost password request'),
                        text: req.translate('mails/lostPasswordRequest', {
                            __LINK__: app.config.servers.self.baseURL + '/lostpassword/' + recoveryToken.atok_token
                        })
                    });

                    res.json({
                        code: 0,
                        message: req.translate('system', 'An email containing the procedure for obtaining a new password has been sent to you.')
                    });
                });
            }).catch(function (err) {
                req.flash('message', req.translate('system',
                    err.errors ? err.errors.map(function (error) {
                        return req.translate('system', error.message);
                    }).join('\n')
                        : (req.translate('system', err.message) || JSON.stringify(err))
                ));
                return res.json({
                    code: -1,
                    errors: req.flash('message').map(function (message) {
                        return {message: message};
                    })
                });
            });
        });

    router.get('/lostpassword/:token',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            app.models.AccessToken.find({
                where: {
                    atok_token: req.params.token,
                    atok_type: 'recovery'
                }
            }).then(function(accessToken) {
                if (!accessToken) {
                    req.flash('message', req.translate('system', 'Token invalid or expired.'));
                    return res.redirect('/lostpassword');
                }

                req.session.lostpasswordRequest = {
                    'token': accessToken.atok_token,
                    'usr_id': accessToken['usr_id']
                };
                accessToken.destroy();

                res.render('site/newpassword', {
                    __layout: "layouts/login"
                });
            }).catch(function (err) {
                req.flash('message', req.translate('system',
                    err.errors ? err.errors.map(function (error) {
                        return req.translate('system', error.message);
                    }).join('\n')
                        : (req.translate('system', err.message) || JSON.stringify(err))
                ));
                return res.redirect('/lostpassword');
            });
        });

    router.post('/lostpassword/:token',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function(req, res) {
            if (!req.session.lostpasswordRequest || req.session.lostpasswordRequest.token != req.params.token) {
                req.flash('message', req.translate('system', 'Token invalid or expired.'));
                return res.redirect('/lostpassword');
            }
            app.models['User'].find({
                'usr_id': req.session.lostpasswordRequest['usr_id']
            }).then(function(account) {
                if (!account) {
                    req.flash('message', req.translate('system', 'Token invalid or expired.'));
                    return res.redirect('/lostpassword');
                }

                account['usr_password'] = req.body.password;
                account.save().then(function(account) {
                    delete req.session.lostpasswordRequest;

                    return app.models.AccessToken.create({
                        'atok_token': crypto.randomBytes(32).toString('hex'),
                        'usr_id': account['usr_id'],
                        'atok_type': 'access'
                    }).then(function (accessToken) {
                        var cookie = new Cookies(req, res);
                        cookie.set("authorization", 'Bearer ' + accessToken.atok_token);

                        account = account.toJSON();
                        account.accessTokenID = accessToken.atok_id;

                        req.login(account, function () {
                            res.redirect('/');
                        });
                    });
                }).catch(function (err) {
                    req.flash('message', req.translate('system',
                        err.errors ? err.errors.map(function (error) {
                            return req.translate('system', error.message);
                        }).join('\n')
                            : (req.translate('system', err.message) || JSON.stringify(err))
                    ));
                    return res.redirect('/lostpassword');
                });
            });
        });

    router.get('/api/auth/me',
        app.requirePermission([
            ['allow', {
                users: '@'
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.json({
                code: 0,
                account: req.account
            });
        });
};
