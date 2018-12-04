/**
 * This is the controller for table "Invitation".
 */
var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    logger = global.logger;

module.exports = function(app) {
    var router = express.Router();
    app.use('/api/invitation', router);

    router.get('/',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function(req, res) {
            var Options = req.query,
                query = {
                    where: {},
                    include: [{
                      model: app.models.User,
                      as: 'Inviter',
                      required: false
                    }, {
                      model: app.models.Playlist,
                      as: 'Playlist',
                      required: false
                    }]
                };
            if (typeof Options.where == "string") Options.where = JSON.parse(Options.where);
            if (typeof Options.limit == "string") Options.limit = parseInt(Options.limit);
            if (typeof Options.page == "string") Options.page = parseInt(Options.page);
            if (typeof Options.sort == "string") Options.sort = JSON.parse(Options.sort);

            Options.where = Options.where || {};

            // filters
            if (!S(Options.where.invited_usr_id).isEmpty()) query.where.invited_usr_id = {like:Options.where.invited_usr_id};
            if (!S(Options.where.inviter_usr_id).isEmpty()) query.where.inviter_usr_id = {like:Options.where.inviter_usr_id};
            if (!S(Options.where.playlist_id).isEmpty()) query.where.playlist_id = {like:Options.where.playlist_id};
            if (!S(Options.where.invited_role).isEmpty()) query.where.invited_role = {like:Options.where.invited_role};

            console.log('Options: ', Options);
            query.limit = Options.limit || null;
            query.offset = Options.limit ? Options.limit * ((Options.page || 1) - 1) : null;
            query.order = (Options.sort && Options.sort.field) ? (Options.sort.field + (Options.sort.asc ? ' ASC' : ' DESC')) : 'invitation_id';
            console.log('query: ', query);
            app.models["Invitation"].findAndCountAll(query).then(function(result) {
              console.log('result: ', result);
              if (!result.count)
                return res.json({
                    code: 1
                });


              if (!Options.limit) return res.json(result.rows);
                res.json(result);
            });
        });

    // Create an invitation to a playlist
    router.post('/',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function(req, res) {
            var Record = req.body;

            if (!Record["invitation_id"])
                return createRecord();
            return updateRecord();

            function createRecord() {
                var record = app.models["Invitation"].build({});

                if (!S(Record.inviter_usr_id).isEmpty()) record.inviter_usr_id = Record.inviter_usr_id;
                if (!S(Record.invited_usr_id).isEmpty()) record.invited_usr_id = Record.invited_usr_id;
                if (!S(Record.playlist_id).isEmpty()) record.playlist_id = Record.playlist_id;
                if (!S(Record.invited_role).isEmpty()) record.invited_role = Record.invited_role;

                var query = {
                    where: {
                      inviter_usr_id: Record.inviter_usr_id,
                      invited_usr_id: Record.invited_usr_id,
                      playlist_id: Record.playlist_id
                    }
                };
                app.models["Playlist"].findOne({
                  where:{
                    playlist_id: record.playlist_id
                  }, include: [{
                    model: app.models.Subscription,
                    as: 'Subscriber',
                    required: false,
                    where: { usr_id: Record.invited_usr_id}
                    }]
                }).then(function(ret){
                  if (ret && ret.dataValues.Subscriber[0]) { return reply(true, "L'utilisateur est deja dans la playlist")}
                  app.models["Invitation"].findAll(query).then(function(result) {
                    if (result[0]) {
                      return reply(true, "L'invitation est deja en attente")
                    }
                      record.save().then(function(record) {
                        console.log("saving")
                          reply(null, record);
                      }).catch(function(err) {
                          reply(err);
                      });
                  }).catch(function(err) {console.log(err)});
                })
            }
            function reply(err, record) {
                if (err) {
                    res.json({
                        code: 2,
                        errors: record
                    })
                } else {
                    res.json({
                        code: 0,
                        "Invitation": record
                    });
                }
            }
        });

    router.delete('/:id',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function(req, res) {
            app.models["Invitation"].find({
                "where":{
                    "invitation_id": req.params.id
                }
            }).then(function(record) {
                if (record) {
                    record.destroy();
                }

                res.json({
                    code: 0,
                    message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'Invitation'})
                });
            });
        });
};
