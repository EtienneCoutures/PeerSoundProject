var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/subscription', router);

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
        if (!Record["sub_id"])
            return createRecord();
        return updateRecord();

        function createRecord() {
            var record = app.models["Subscription"].build({});

            // Add fields
            if (!S(Record.usr_id).isEmpty()) record.usr_id = Record.usr_id;
            if (!S(Record.playlist_id).isEmpty()) record.playlist_id = Record.playlist_id;

            record.save().then(function (record) {
                reply(null, record);
            }).catch(function (err) {
                reply(err);
            });
        }
        function updateRecord() {
            app.models["Subscription"].find({
                "where":{
                    "sub_id": Record["sub_id"]
                }
            }).then(function (record) {
                if (!record) return reply(req.translate('system', 'Record not found'));

                // Update fields

                if (!S(Record.sub_id).isEmpty()) record.sub_id = Record.sub_id;
                if (!S(Record.usr_id).isEmpty()) record.usr_id = Record.usr_id;
                if (!S(Record.playlist_id).isEmpty()) record.playlist_id = Record.playlist_id;

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
                    "Subscription": record
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
            if (!S(Options.where.usr_id).isEmpty()) query.where.usr_id = {like:Options.where.usr_id};
            if (!S(Options.where.playlist_id).isEmpty()) query.where.playlist_id = {like:Options.where.playlist_id};

            query.limit = Options.limit || null;
            query.offset = Options.limit ? Options.limit * ((Options.page || 1) - 1) : null;
            query.order = (Options.sort && Options.sort.field) ? (Options.sort.field + (Options.sort.asc ? ' ASC' : ' DESC')) : 'sub_id';

            app.models["Subscription"].findAndCountAll(query).then(function (result) {
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
                app.models["Subscription"].find({
                    "where":{
                        "usr_id": req.query.usr_id,
                        "playlist_id": req.query.pl_id
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
