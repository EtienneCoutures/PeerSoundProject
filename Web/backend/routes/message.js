var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    logger = global.logger;

module.exports = function (app) {

  var router = express.Router();
  app.use('/api/message', router)

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
          console.log("lalal")
          if (!Record["message_id"])
              return createRecord();
          return updateRecord();

          function createRecord() {
          /*    if (!app.requirePermission.roles('allow', ['super-admin', 'admin']).check(req.account)) {
                  return reply(req.translate('system', 'You do not have permissions to create a user.'));
              }*/
              var record = app.models["Message"].build({});

              // Add fields
              if (!S(Record.sender_id).isEmpty()) record.sender_id = Record.sender_id;
              if (!S(Record.dest_id).isEmpty()) record.dest_id = Record.dest_id;
              if (!S(Record.content).isEmpty()) record.content = Record.content;

              record.save().then(function (record) {
                  reply(null, record);
              }).catch(function (err) {
                  reply(err);
              });
          }
          function updateRecord() {
              app.models["Message"].find({
                  "where":{
                      "message_id": Record["message_id"]
                  }
              }).then(function (record) {
                  if (!record) return reply(req.translate('system', 'Record not found'));
                  /*if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                      // super-admin has all permissions
                  } else if (app.requirePermission.roles('allow', ['admin']).check(req.account)) {
                      if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                          return reply(req.translate('system', 'You do not have permissions update this user.'))
                      }
                  } else if (req.account['usr_id'] != record['usr_id']) {
                      return reply(req.translate('system', 'You do not have permissions update this user.'))
                  }*/

                  // Update fields
                  console.log("on y est")
              if (!S(Record.sender_id).isEmpty()) record.sender_id = Record.sender_id;
              if (!S(Record.dest_id).isEmpty()) record.dest_id = Record.dest_id;
              if (!S(Record.content).isEmpty()) record.content = Record.content;
              if (!S(Record.is_read).isEmpty()) record.is_read = Record.is_read ;


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
                      code: -1,
                      errors: (err.errors && err.errors.length > 0) ? err.errors : [{message: err.message || err}]
                  });
              } else {
                  res.json({
                      "code": 0,
                  });
              }
          }
      });


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
              if (!S(Options.where.dest_id).isEmpty()) query.where.dest_id = {like:Options.where.dest_id};
              if (!S(Options.where.sender_id).isEmpty()) query.where.sender_id = {like:Options.where.sender_id};
              if (!S(Options.where.is_read).isEmpty()) query.where.is_read = {like:Options.where.is_read};


              query.limit = Options.limit || null;
              query.offset = Options.limit ? Options.limit * ((Options.page || 1) - 1) : null;
              query.order = (Options.sort && Options.sort.field) ? (Options.sort.field + (Options.sort.asc ? ' ASC' : ' DESC')) : 'message_id';

              app.models["Message"].findAndCountAll(query).then(function (result) {
                  if (!Options.limit) return res.json(result.rows);
                  res.json(result);
              });
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
                console.log(req.query)
                  app.models["Message"].find({
                      "where":{
                          "message_id": req.query.message_id
                      }
                  }).then(function(record) {
                      if (record) {
                          record.destroy();
                      }

                      res.json({
                          code: 0,
                          message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'Message'})
                      });
                  });
              });

};
