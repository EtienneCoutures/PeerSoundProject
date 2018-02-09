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

    router.get('/me',
        function(req, res) {
          var requete = "SELECT * from follow where followed_usr_id='" + req.query.id + "' AND follower_usr_id='" + req.query.me + "';"
            con.query(requete,
            function(err, result, fields) {
              return res.json({
                "res": result
              })
            });
        });

    router.get('/follower/:id',
        function (req, res) {
            con.query("SELECT * from follow where follower_usr_id='" + req.params.id + "'", function (err, result, fields) {
               if (err) {return res.json({code: 1})}
                console.log(result);
                res.json({
                    "code": 0,
                    "Follow": result
                });
             });
        });

        router.post('/:id/:me', function(req, res) {
          requete = "insert into follow (follow_insert, followed_usr_id, follower_usr_id) values ('" + new Date().toJSON().slice(0,10).replace(/-/g,'/') + "', '" + req.params.id +"','" + req.params.me + "');"
          console.log(requete)
          con.query(requete, function(err, result, fields) {
            console.log(err)
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

        router.get('/followed/:id',
            function (req, res) {
              console.log("requete follow")

                con.query("SELECT * from follow where followed_usr_id='" + req.params.id + "'", function (err, result, fields) {
                   if (err) {return res.json({code: 1})}
                    console.log(result);
                    res.json({
                        "code": 0,
                        "Follow": result
                    });
                 });
            });

  };
