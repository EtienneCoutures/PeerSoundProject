/**
 * This is the controller for table "Music".
 */
var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/music', router);

    // List All models of Music
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
            if (!S(Options.where.music_name).isEmpty()) query.where.music_name = {like:Options.where.music_name + '%'};

            query.limit = Options.limit || null;
            query.offset = Options.limit ? Options.limit * ((Options.page || 1) - 1) : null;
            query.order = (Options.sort && Options.sort.field) ? (Options.sort.field + (Options.sort.asc ? ' ASC' : ' DESC')) : 'music_id';

            app.models["Music"].findAndCountAll(query).then(function (result) {
                if (!Options.limit) return res.json(result.rows);
                res.json(result);
            });
        });

    // Render a Music
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
                    "music_id": req.params.id
                },
                include: []
            };

            app.models["Music"].findOne(query).then(function (result) {
                if (!result) {
                    return res.json({
                        code: 1
                    });
                }

                res.json({
                    "code": 0,
                    "Music": result
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

            if (!Record["music_id"])
                return createRecord();
            return updateRecord();

            function createRecord() {
                var record = app.models["Music"].build({});

                // Add fields
                if (!S(Record.music_name).isEmpty()) record.music_name = Record.music_name;
                if (!S(Record.music_description).isEmpty()) record.music_description = Record.music_description;
                if (!S(Record.music_picture_default).isEmpty()) record.music_picture_default = Record.music_picture_default;
                if (!S(Record.music_source).isEmpty()) record.music_source = Record.music_source;
                if (!S(Record.usr_id).isEmpty()) record.usr_id = Record.usr_id;
                if (!S(Record.music_group).isEmpty()) record.music_group = Record.music_group;


                record.save().then(function (record) {
                    reply(null, record);
                }).catch(function (err) {
                    reply(err);
                });
            }
            function updateRecord() {
                app.models["Music"].find({
                    "where":{
                        "music_id": Record["music_id"]
                    }
                }).then(function (record) {
                    if (!record) return reply(req.translate('system', 'Record not found'));

                    // Update fields
                if (!S(Record.music_name).isEmpty()) record.music_name = Record.music_name;
                if (!S(Record.music_description).isEmpty()) record.music_description = Record.music_description;
                if (!S(Record.music_comment).isEmpty()) record.music_comment = Record.music_comment;
                if (!S(Record.music_picture_default).isEmpty()) record.music_picture_default = Record.music_picture_default;
                if (!S(Record.music_source).isEmpty()) record.music_source = Record.music_source;
                if (!S(Record.usr_id).isEmpty()) record.usr_id = Record.usr_id;
                if (!S(Record.music_group).isEmpty()) record.music_group = Record.music_group;

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
                        "Music": record
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
            app.models["Music"].find({
                "where":{
                    "music_id": req.params.id
                }
            }).then(function(record) {
                if (record) {
                    record.destroy();
                }

                res.json({
                    code: 0,
                    message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'Music'})
                });
            });
        });
};
