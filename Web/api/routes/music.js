/**
 * This is the controller for table "Music".
 */
'use strict';
var express = require('express'),
    _       = require('underscore'),
    async   = require('async'),
    S       = require('string'),
    screen  = require('screener').screen,
    moment  = require('moment'),
    logger  = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/music', router);

    // List all [Music]
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
            var limit = parseInt(req.query.limit || 25),
                page = parseInt(req.query.page || 1),
                sort = req.query.sort || '',
                Query = req.query.q || {},
                query = {
                    where: {},
                    include: [],
                    offset: (page - 1) * limit,
                    limit: limit,
                    order: sort
                };

            // Add filters 
            if (!S(Query.music_name).isEmpty()) query.where.music_name = {like:Query.music_name + '%'};

            app.models['Music'].findAndCountAll(query).then(function (result) {
                res.json({
                    "rows": result.rows,
                    "count": result.count
                });
            });
        });

    // Find [Music] by ID
    router.get('/:id',
        app.requirePermission([
            ['allow', {
                users:['@']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function(req, res) {
            var query = {
                where: {
                    "music_id": req.params.id
                },
                include: []
            };

            app.models["Music"].find(query).then(function (result) {
                if (!result) return res.status(404).end();

                res.json(screen(result, {
                    "music_id": "number",
                    "music_name": "string",
                    "music_picture_default": "string",
                    "music_source": "string"
                }));
            });
        });

    // Add a new [Music]
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
            var Record = req.body,
                record = app.models["Music"].build({
                    act_id: req.account.act_id
                });
            
            if (!S(Record.music_name).isEmpty()) record.music_name = Record.music_name;
            if (!S(Record.music_description).isEmpty()) record.music_description = Record.music_description;
            if (!S(Record.music_picture_default).isEmpty()) record.music_picture_default = Record.music_picture_default;
            if (!S(Record.music_source).isEmpty()) record.music_source = Record.music_source;

            record.save().then(function (record) {
                res.json(screen(record, {
                    "music_id": "number",
                    "music_name": "string",
                    "music_picture_default": "string",
                    "music_source": "string"
                }));
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Update a [Music]
    router.put('/',
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

            app.models["Music"].find({
                where: {
                    "music_id": Record["music_id"]
                }
            }).then(function(record) {
                if (!record) return res.status(404).end();
                if (!S(Record.music_name).isEmpty()) record.music_name = Record.music_name;
                if (!S(Record.music_description).isEmpty()) record.music_description = Record.music_description;
                if (!S(Record.music_comment).isEmpty()) record.music_comment = Record.music_comment;
                if (!S(Record.music_picture_default).isEmpty()) record.music_picture_default = Record.music_picture_default;
                if (!S(Record.music_source).isEmpty()) record.music_source = Record.music_source;

                return record.save().then(function (record) {
                    res.json(screen(record, {
                        "music_id": "number",
                        "music_name": "string",
                        "music_picture_default": "string",
                        "music_source": "string"
                    }));
                })
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Delete a [Music]
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
            var query = {
                where: {
                    "music_id": req.params.id
                }
            };

            app.models["Music"].find(query).then(function (record) {
                if (!record) return res.status(404).end();
                record.destroy();

                res.json(screen(record, {
                    "music_id": "number",
                    "music_name": "string",
                    "music_picture_default": "string",
                    "music_source": "string"
                }));
            });
        });
};
