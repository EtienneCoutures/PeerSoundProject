/**
 * This is the controller for table "MusicLink".
 */
var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/musiclink', router);

    // Create / Update a Link between Musics and Playlists
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

            if (!Record["musiclink_id"])
                return createRecord();
            return updateRecord();

            function createRecord() {
                var record = app.models["MusicLink"].build({});

                // Add fields
                if (!S(Record.music_id).isEmpty()) record.music_id = Record.music_id;
                if (!S(Record.playlist_id).isEmpty()) record.playlist_id = Record.playlist_id;
                if (!S(Record.usr_id).isEmpty()) record.usr_id = Record.usr_id;


                record.save().then(function (record) {
                    reply(null, record);
                }).catch(function (err) {
                    reply(err);
                });
            }
            function updateRecord() {
                console.log("update");
                /*app.models["Music"].find({
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
                    if (!S(Record.music_group).isEmpty()) record.music_group = Record.music_group;
                    if (!S(Record.music_url).isEmpty()) record.music_url = Record.music_url;
                    if (!S(Record.music_date).isEmpty()) record.music_date = Record.music_date;
                    if (!S(Record.usr_id).isEmpty()) record.usr_id = Record.usr_id;

                    record.save().then(function (record) {
                        reply(null, record);
                    }).catch(function (err) {
                        reply(err);
                    });
                });*/
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
                        "MusicLink": record
                    });
                }
            }
        });

};
