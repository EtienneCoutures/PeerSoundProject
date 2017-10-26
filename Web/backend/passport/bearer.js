/**
 * Bearer Strategy
 */
var express        = require('express'),
    router         = express.Router(),
    BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function (app, passport) {
    passport.use(new BearerStrategy(
            function (accessToken, done) {
                app.models.AccessToken.find({
                    where: {
                        atok_token: accessToken,
                        atok_type: 'access'
                    },
                    include: [{
                        model: app.models['User'],
                        as: 'User'
                    }]
                }).then(function (accessToken) {
                    if (!accessToken || !accessToken['User']) {
                        return done({
                            status: 401,
                            message: 'Token invalid or expired.'
                        }, false);
                    }
                    if (Math.round((Date.now() - accessToken.atok_update) / 1000) > 3600) {
                        accessToken.destroy();
                        return done({
                            status: 401,
                            message: 'Token invalid or expired.'
                        }, false);
                    }
                    accessToken.changed('atok_update', true);
                    accessToken.save();

                    var account = accessToken['User'].toJSON();
                    account.accessTokenID = accessToken.atok_id;
                    done(null, account);
                });
            })
    );
};
