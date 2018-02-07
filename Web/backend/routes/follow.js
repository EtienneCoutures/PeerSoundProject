var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    crypto = require('password-hash'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/follow', router);

    router.get('/:id',
        function (req, res) {
          console.log("requete follow")
            var query = {
                where: {
                    "follower_usr_id": req.params.id
                },
                include: []
            };
            app.models["Follow"].findOne(query).then(function (result) {
                if (!result) {
                    return res.json({
                        code: 1
                    });
                }
                res.json({
                    "code": 0,
                    "Follow": result
                });
            });
        });

  };
