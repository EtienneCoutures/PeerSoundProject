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


          router.get('/test',
          function (req, res) {
            app.models["Follow"].findAndCountAll().then(function (result) {
              console.log("lallalal")
              console.log(result)
              res.json(result);
            });
          });




          router.get('/me',
          function (req, res) {
            app.models["Follow"].find({"where":{
              "follower_usr_id": req.query.id,
              "followed_usr_id": req.query.me
            }
          }).then(function (result, err) {
            if (err) {return res.json({code: 1})}
            res.json({
              "followed": result.count,
              "date": result.dataValues.follow_insert
            });
          });
        });


        router.post('/:id/:me', function(req, res) {
          requete = "insert into follow (follow_insert, followed_usr_id, follower_usr_id) values ('" + new Date().toJSON().slice(0,10).replace(/-/g,'/') + "', '" + req.params.id +"','" + req.params.me + "');"
          con.query(requete, function(err, result, fields) {
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


        router.get('/follower/:id',
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
            "count": result.count
          });
        });
      });



  };
