var express = require('express'),
    passport = require('passport'),
    Cookies = require('cookies'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();

    app.use('/', router);

    /**
     * Home
     */
    router.get('/',
        function (req, res, next) {
            res.render('layouts/main', {
                __layout: false
            });
            user = new User();
            console.log(user)
        });

    /**
     * SignUp
     */
    router.get('/signup',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.render('site/signup', {
                __layout: "layouts/login",
                messages: req.flash('message')
            });

        });

    /**
     * Logout
     */
    router.get('/api/logout',
        app.requirePermission([
            ['allow', {
                users: '@' // Connected only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            app.models.AccessToken.destroy({
                where: {
                    atok_id: req.account.accessTokenID
                }
            }).done(function() {
                req.logout();
                res.json({
                    code: 0
                });
            });
        });

    /**
     * Lost password
     */
    router.get('/lostpassword',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.render('site/lostpassword', {
                __layout: "layouts/login",
                messages: req.flash('message')
            });
        });
};
