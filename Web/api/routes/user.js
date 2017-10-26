/**
 * This is the controller for table "User".
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
    app.use('/api/user', router);

    // List all [User]
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
            if (!S(Query.usr_firstname).isEmpty()) query.where.usr_firstname = {like:Query.usr_firstname + '%'};
            if (!S(Query.usr_lastname).isEmpty()) query.where.usr_lastname = {like:Query.usr_lastname + '%'};
            if (!S(Query.usr_role).isEmpty()) query.where.usr_role = Query.usr_role;
            if (!S(Query.usr_status).isEmpty()) query.where.usr_status = Query.usr_status;

            app.models['User'].findAndCountAll(query).then(function (result) {
                res.json({
                    "rows": result.rows,
                    "count": result.count
                });
            });
        });

    // Find [User] by ID
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
                    "usr_id": req.params.id
                },
                include: []
            };

            app.models["User"].find(query).then(function (result) {
                if (!result) return res.status(404).end();

                res.json(screen(result, {
                    "usr_id": "number",
                    "usr_login": "string",
                    "usr_email": "string",
                    "usr_firstname": "string",
                    "usr_lastname": "string",
                    "usr_role": "string",
                    "usr_status": "string"
                }));
            });
        });

    // Add a new [User]
    router.post('/',
        app.requirePermission([
            ['allow', {
                users:['@'],
                roles: ['super-admin', 'admin']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            var Record = req.body,
                record = app.models["User"].build({
                    act_id: req.account.act_id
                });
            
            if (!S(Record.usr_login).isEmpty()) record.usr_login = Record.usr_login;
            if (!S(Record.usr_password).isEmpty()) record.usr_password = Record.usr_password;
            if (!S(Record.usr_email).isEmpty()) record.usr_email = Record.usr_email;
            if (!S(Record.usr_gender).isEmpty()) record.usr_gender = Record.usr_gender;
            if (!S(Record.usr_firstname).isEmpty()) record.usr_firstname = Record.usr_firstname;
            if (!S(Record.usr_lastname).isEmpty()) record.usr_lastname = Record.usr_lastname;
            if (!S(Record.usr_phone).isEmpty()) record.usr_phone = Record.usr_phone;
            if (!S(Record.usr_birthday).isEmpty()) record.usr_birthday = Record.usr_birthday;
            if (!S(Record.usr_role).isEmpty()) record.usr_role = Record.usr_role;
            if (!S(Record.usr_status).isEmpty()) record.usr_status = Record.usr_status;

            record.save().then(function (record) {
                res.json(screen(record, {
                    "usr_id": "number",
                    "usr_login": "string",
                    "usr_email": "string",
                    "usr_firstname": "string",
                    "usr_lastname": "string",
                    "usr_role": "string",
                    "usr_status": "string"
                }));
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Update a [User]
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

            app.models["User"].find({
                where: {
                    "usr_id": Record["usr_id"]
                }
            }).then(function(record) {
                if (!record) return res.status(404).end();
                if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                    // super-admin has all permissions
                } else if (app.requirePermission.roles('allow', ['admin']).check(req.account)) {
                    if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                        return res.status(400).end(req.translate('system', 'You do not have permissions update this user.'));
                    }
                } else if (req.account['usr_id'] != record['usr_id']) {
                    return res.status(400).end(req.translate('system', 'You do not have permissions update this user.'))
                }
                
                if (!S(Record.usr_login).isEmpty()) record.usr_login = Record.usr_login;
                if (!S(Record.usr_password).isEmpty()) record.usr_password = Record.usr_password;
                if (!S(Record.usr_email).isEmpty()) record.usr_email = Record.usr_email;
                if (!S(Record.usr_gender).isEmpty()) record.usr_gender = Record.usr_gender;
                if (!S(Record.usr_firstname).isEmpty()) record.usr_firstname = Record.usr_firstname;
                if (!S(Record.usr_lastname).isEmpty()) record.usr_lastname = Record.usr_lastname;
                if (!S(Record.usr_phone).isEmpty()) record.usr_phone = Record.usr_phone;
                if (!S(Record.usr_birthday).isEmpty()) record.usr_birthday = Record.usr_birthday;
                if (!S(Record.usr_role).isEmpty()) record.usr_role = Record.usr_role;
                if (!S(Record.usr_status).isEmpty()) record.usr_status = Record.usr_status;

                return record.save().then(function (record) {
                    res.json(screen(record, {
                        "usr_id": "number",
                        "usr_login": "string",
                        "usr_email": "string",
                        "usr_firstname": "string",
                        "usr_lastname": "string",
                        "usr_role": "string",
                        "usr_status": "string"
                    }));
                })
            }).catch(function (err) {
                logger.error(err);
                res.status(400).json({
                    error: err
                });
            });
        });

    // Delete a [User]
    router.delete('/:id',
        app.requirePermission([
            ['allow', {
                users:['@'],
                roles: ['super-admin', 'admin']
            }],
            ['deny', {
                users:'*'
            }]
        ]),
        function (req, res) {
            var query = {
                where: {
                    "usr_id": req.params.id
                }
            };

            app.models["User"].find(query).then(function (record) {
                if (!record) return res.status(404).end();
                if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                    // super-admin has all permissions
                } else {
                    if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                        return res.status(400).end(req.translate('system', 'You do not have permissions delete this user.'));
                    }
                }
                record.destroy();

                res.json(screen(record, {
                    "usr_id": "number",
                    "usr_login": "string",
                    "usr_email": "string",
                    "usr_firstname": "string",
                    "usr_lastname": "string",
                    "usr_role": "string",
                    "usr_status": "string"
                }));
            });
        });
};
