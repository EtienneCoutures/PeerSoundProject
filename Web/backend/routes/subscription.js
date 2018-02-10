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
};
