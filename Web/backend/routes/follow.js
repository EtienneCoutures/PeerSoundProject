var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    crypto = require('password-hash'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/follow', router);


/*    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "itiz",
      password: "judelapoire",
      database: "peersoundproject"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("connecté depuis follow");
      });
*/

router.get('/',
    app.requirePermission([
        ['allow', {
            users:['@']
        }],
        ['deny', {
            users:'*'
        }]
    ]),
    function (req, res) {
        var Options = req.query,
            query = {
                where: {},
                include: []
            };
        if (typeof Options.where == "string") Options.where = JSON.parse(Options.where);
        if (typeof Options.limit == "string") Options.limit = parseInt(Options.limit);
        if (typeof Options.page == "string") Options.page = parseInt(Options.page);
        if (typeof Options.sort == "string") Options.sort = JSON.parse(Options.sort);

        Options.where = Options.where || {};

        // Add filters
        if (!S(Options.where.followed_usr_id).isEmpty()) query.where.followed_usr_id = {like:Options.where.followed_usr_id};
        if (!S(Options.where.follower_usr_id).isEmpty()) query.where.follower_usr_id = {like:Options.where.follower_usr_id};

        query.limit = Options.limit || null;
        query.offset = Options.limit ? Options.limit * ((Options.page || 1) - 1) : null;
        query.order = (Options.sort && Options.sort.field) ? (Options.sort.field + (Options.sort.asc ? ' ASC' : ' DESC')) : 'follow_id';

        app.models["Follow"].findAndCountAll(query).then(function (result) {
            if (!Options.limit) return res.json(result.rows);
            res.json(result);
        });
    });



        router.post('/',
            app.requirePermission([
                ['allow', {
                    users:['@']
                }],
                ['deny', {
                    users:'*'
                }]
            ]),
            function (req, res) {
                var Record = req.body;
                if (!Record["follow_id"])
                    return createRecord();
                return updateRecord();

                function createRecord() {
                    var record = app.models["Follow"].build({});

                    // Add fields
                    if (!S(Record.follower_usr_id).isEmpty()) record.follower_usr_id = Record.follower_usr_id;
                    if (!S(Record.followed_usr_id).isEmpty()) record.followed_usr_id = Record.followed_usr_id;

                    record.save().then(function (record) {
                        reply(null, record);
                    }).catch(function (err) {
                        reply(err);
                    });
                }
                function updateRecord() {
                    app.models["Follow"].find({
                        "where":{
                            "follow_id": Record["follow_id"]
                        }
                    }).then(function (record) {
                        if (!record) return reply(req.translate('system', 'Record not found'));

                        // Update fields

                    if (!S(Record.follower_usr_id).isEmpty()) record.follower_usr_id = Record.follower_usr_id;
                    if (!S(Record.followed_usr_id).isEmpty()) record.followed_usr_id = Record.followed_usr_id;

                        record.save().then(function (record) {
                            reply(null, record);
                        }).catch(function (err) {
                            reply(err);
                        });
                    });
                }
                function reply(err, record) {
                    if (err) {
                        res.json({
                            code: 1,
                            errors: (err.errors && err.errors.length > 0) ? err.errors : [{message: err.message || err}]
                        });
                    } else {
                        res.json({
                            "code": 0,
                        });
                    }
                }
            });


            router.delete('/',
                app.requirePermission([
                    ['allow', {
                        users:['@']
                    }],
                    ['deny', {
                        users:'*'
                    }]
                ]),
                function (req, res) {
                    app.models["Follow"].find({
                        "where":{
                            "follower_usr_id": req.query.follower_usr_id,
                            "followed_usr_id": req.query.followed_usr_id
                        }
                    }).then(function(record) {
                        if (record) {
                            record.destroy();
                        }

                        res.json({
                            code: 0,
                            message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'Follow'})
                        });
                    });
                });


        router.get('/followerNb/:id',
        function (req, res) {
          app.models["Follow"].findAndCountAll({"where":{
            "follower_usr_id": req.params.id
          }
        }).then(function (result, err) {
          if (err) {return res.json({code: 1})}
          res.json({
            "code": 0,
            "count": result.count
          });
        });
      });


      router.get('/followed/:id',
      function (req, res) {
        app.models["Follow"].findAndCountAll({"where":{
          "followed_usr_id": req.params.id
        }
      }).then(function (result, err) {
        if (err) {return res.json({code: 1})}
        res.json({
          "code": 0,
          "count": result.count,
          "rows": result.rows
        });
      });
    });

      router.get('/follower/:id',
      function (req, res) {
        app.models["Follow"].findAndCountAll({"where":{
          "follower_usr_id": req.params.id
        }
      }).then(function (result, err) {
        if (err) {return res.json({code: 1})}
        res.json({
          "code": 0,
          "count": result.count,
          "rows": result.rows
        });
      });
    });

        router.get('/followedNb/:id',
        function (req, res) {
          app.models["Follow"].findAndCountAll({"where":{
            "followed_usr_id": req.params.id
          }
        }).then(function (result, err) {
          if (err) {return res.json({code: 1})}
          res.json({
            "code": 0,
            "count": result.count
          });
        });
      });
  };
