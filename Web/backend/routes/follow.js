var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    crypto = require('password-hash'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/follow', router);


    var mysql = require('mysql');

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

/*  test */

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

/* test */


          /*router.get('/test',
          function (req, res) {
            app.models["Follow"].findAndCountAll().then(function (result) {
              console.log("lallalal")
              console.log(result)
              res.json(result);
            });
          });
*/



          router.get('/me',
          function (req, res) {
            app.models["Follow"].find({"where":{
              "follower_usr_id": req.query.me,
              "followed_usr_id": req.query.id
            }
          }).then(function (result, err) {
            if (err) {return res.json({code: 1})}
            if (!result) {
              return res.json({
                "followed": 0
              })
            }
            return res.json({
              "followed": 1,
              "date": result.dataValues.follow_insert
            });
          });
        });


        router.post('/:id/:me', function(req, res) {
          requete = "insert into follow (follow_insert, followed_usr_id, follower_usr_id) values ('" + new Date().toJSON().slice(0,10).replace(/-/g,'/') + "', '" + req.params.id +"','" + req.params.me + "');"
          con.query(requete, function(err, result, fields) {
            console.log("post")
            console.log("to follow: " + req.params.id)
            console.log("me : " + req.params.me)
            if (err) {return res.json({
              "code": 1
            })}
            return res.json({
              "code": 0
            })
          })
        })



        router.get('/delete', function(req, res) {
          con.query("delete from follow where followed_usr_id='" + req.query.id +"' AND follower_usr_id='" + req.query.me + "'", function(err, result, fields) {
            if (err) {return res.json({
              "code": 1
            })}
            return res.json({
              "code": 0
            })
          })
        })


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
