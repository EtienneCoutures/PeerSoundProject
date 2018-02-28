/**
 * This is the controller for table "Playlist".
 */
var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/playlist', router);

    // List All models of Playlist
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
            if (!S(Options.where.playlist_id).isEmpty()) query.where.playlist_id = {like:Options.where.playlist_id};
            if (!S(Options.where.playlist_name).isEmpty()) query.where.playlist_name = {like:Options.where.playlist_name + '%'};
            if (!S(Options.where.playlist_creator).isEmpty()) query.where.playlist_creator = {like:Options.where.playlist_creator};

            query.limit = Options.limit || null;
            query.offset = Options.limit ? Options.limit * ((Options.page || 1) - 1) : null;
            query.order = (Options.sort && Options.sort.field) ? (Options.sort.field + (Options.sort.asc ? ' ASC' : ' DESC')) : 'playlist_id';
            app.models["Playlist"].findAndCountAll(query).then(function (result) {
              if (!result.count)
              return res.json({
                  code: 1
              });
              if (!Options.limit) return res.json(result.rows);
              res.json(result);
            });
        });

    // Render a Playlist
    router.get('/:id(\\d+)',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            var query = {
                where: {
                    "playlist_id": req.params.id
                },
                include: [{
                  model: app.models.Subscription,
                  as: 'Subscriber',
                  where: {
                    usr_id: req.query.id
                  },
                  required: false
                }],
                include: [{
                  model: app.models.MusicLink,
                  as: 'MusicLink',
                  required: false,
                  /*include: [{
                    model: app.models.Music,
                    as: 'Music',
                    required: true
                  }]*/
                }]
            };
            app.models["Playlist"].findOne(query).then(function (result) {
                if (!result) {
                    return res.json({
                        code: 1
                    });
                }

                res.json({
                    "code": 0,
                    "Playlist": result
                });
            });
        });

    // Create / Update a Music
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
            if (!Record["playlist_id"])
                return createRecord();
            return updateRecord();

            function createRecord() {
                var record = app.models["Playlist"].build({});

                // Add fields
                if (!S(Record.playlist_name).isEmpty()) record.playlist_name = Record.playlist_name;
                if (!S(Record.playlist_style).isEmpty()) record.playlist_style = Record.playlist_style;
                if (!S(Record.playlist_description).isEmpty()) record.playlist_description = Record.playlist_description;
                if (!S(Record.playlist_comment).isEmpty()) record.playlist_comment = Record.playlist_comment;
                if (!S(Record.playlist_creator).isEmpty()) record.playlist_creator = Record.playlist_creator;


                record.save().then(function (record) {
                    reply(null, record);
                }).catch(function (err) {
                    reply(err);
                });
            }
            function updateRecord() {
                app.models["Playlist"].find({
                    "where":{
                        "playlist_id": Record["playlist_id"]
                    }
                }).then(function (record) {
                    if (!record) return reply(req.translate('system', 'Record not found'));

                    // Update fields
                    if (!S(Record.playlist_name).isEmpty()) record.playlist_name = Record.playlist_name;
                    if (!S(Record.playlist_style).isEmpty()) record.playlist_style = Record.playlist_style;
                    if (!S(Record.playlist_description).isEmpty()) record.playlist_description = Record.playlist_description;
                    if (!S(Record.playlist_comment).isEmpty()) record.playlist_comment = Record.playlist_comment;
                    if (!S(Record.playlist_creator).isEmpty()) record.playlist_creator = Record.playlist_creator;

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
                        "Playlist": record
                    });
                }
            }
        });

        // Delete a Music
        router.delete('/:id',
            app.requirePermission([
                ['allow', {
                    users:['@']
                }],
                ['deny', {
                    users:'*'
                }]
            ]),
            function (req, res) {
                app.models["Playlist"].find({
                    "where":{
                        "playlist_id": req.params.id
                    }
                }).then(function(record) {
                    if (record) {
                        record.destroy();
                    }

                    res.json({
                        code: 0,
                        message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'Playlist'})
                    });
                });
            });

  };
