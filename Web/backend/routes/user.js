/**
 * This is the controller for table "User".
 */
var express = require('express'),
    async = require('async'),
    Cookies = require('cookies'),
    S = require('string'),
    crypto = require('password-hash'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();
    app.use('/api/user', router);

    // List All models of User
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
            if (!S(Options.where.usr_login).isEmpty()) query.where.usr_login = {like:Options.where.usr_login + '%'};
            if (!S(Options.where.usr_id).isEmpty()) query.where.usr_id = {like:Options.where.usr_id};
            if (!S(Options.where.usr_firstname).isEmpty()) query.where.usr_firstname = {like:Options.where.usr_firstname + '%'};
            if (!S(Options.where.usr_lastname).isEmpty()) query.where.usr_lastname = {like:Options.where.usr_lastname + '%'};
            if (!S(Options.where.usr_role).isEmpty()) query.where.usr_role = Options.where.usr_role;
            if (!S(Options.where.usr_status).isEmpty()) query.where.usr_status = Options.where.usr_status;

            query.limit = Options.limit || null;
            query.offset = Options.limit ? Options.limit * ((Options.page || 1) - 1) : null;
            query.order = (Options.sort && Options.sort.field) ? (Options.sort.field + (Options.sort.asc ? ' ASC' : ' DESC')) : 'usr_id';

            app.models["User"].findAndCountAll(query).then(function (result) {
              if (!Options.limit) return res.json(result.rows);
              res.json(result);
            });
        });

    // Render a User
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
                    "usr_id": req.params.id
                },
                include: []
            };
            console.log("c'est la bonne fonction")
            app.models["User"].findOne(query).then(function (result) {
                if (!result) {
                    return res.json({
                        code: 1
                    });
                }
              //penser a return result.dataValues, c'est completement con de return un array sur un findOne
                res.json({
                    "code": 0,
                    "User": result
                });
            });
        });

        router.get('/:name',
            function (req, res) {
              console.log("merde")
                var query = {
                    where: {
                        "usr_login": req.params.name
                    },
                    include: []
                };
                app.models["User"].findOne(query).then(function (result) {
                    if (!result) {
                        return res.json({
                            code: 1
                        });
                    }
                    res.json({
                        "code": 0,
                        "User": result
                    });
                });
            });

        /*router.post('/fileupload', {
          var form = new formidable.IncomingForm();
          form.parse(req, function (err, fields, files) {
            res.write('File uploaded');
            console.log("zizi")
            res.end();
          };*/
          router.post('/fileupload',
              app.requirePermission([
                  ['allow', {
                      users:['@']
                  }],
                  ['deny', {
                      users:'*'
                  }]
              ]),
              function (req, res) {
                console.log("t'es con")
              });

    // Create / Update a User
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

            if (!Record["usr_id"])
                return createRecord();
            return updateRecord();

            function createRecord() {
                if (!app.requirePermission.roles('allow', ['super-admin', 'admin']).check(req.account)) {
                    return reply(req.translate('system', 'You do not have permissions to create a user.'));
                }
                var record = app.models["User"].build({});

                // Add fields
                if (!S(Record.usr_login).isEmpty()) record.usr_login = Record.usr_login;
                if (!S(Record.usr_password).isEmpty()) record.usr_password = Record.usr_password;
                if (!S(Record.usr_email).isEmpty()) record.usr_email = Record.usr_email;
                if (!S(Record.usr_gender).isEmpty()) record.usr_gender = Record.usr_gender;
                if (!S(Record.usr_firstname).isEmpty()) record.usr_firstname = Record.usr_firstname;
                if (!S(Record.usr_lastname).isEmpty()) record.usr_lastname = Record.usr_lastname;
                if (!S(Record.usr_phone).isEmpty()) record.usr_phone = Record.usr_phone;
                if (!S(Record.usr_birthday).isEmpty()) record.usr_birthday = Record.usr_birthday;
                if (!S(Record.usr_role).isEmpty()) record.usr_role = Record.usr_role;
                if (!S(Record.image).isEmpty()) record.image = Record.image;
                if (!S(Record.usr_status).isEmpty()) record.usr_status = Record.usr_status;
                if (!S(Record.usr_image).isEmpty()) record.usr_image = Record.usr_image;

                record.save().then(function (record) {
                    reply(null, record);
                }).catch(function (err) {
                    reply(err);
                });
            }
            function updateRecord() {
                app.models["User"].find({
                    "where":{
                        "usr_id": Record["usr_id"]
                    }
                }).then(function (record) {
                    if (!record) return reply(req.translate('system', 'Record not found'));
                    if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                        // super-admin has all permissions
                    } else if (app.requirePermission.roles('allow', ['admin']).check(req.account)) {
                        if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                            return reply(req.translate('system', 'You do not have permissions update this user.'))
                        }
                    } else if (req.account['usr_id'] != record['usr_id']) {
                        return reply(req.translate('system', 'You do not have permissions update this user.'))
                    }

                    // Update fields
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
                    if (!S(Record.usr_image).isEmpty()) record.usr_image = Record.usr_image;

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
                        "User": record
                    });
                }
            }
        });

    //Update a User without modifying password
    router.post('/mod',
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

            return updateRecord();

            function updateRecord() {
                app.models["User"].find({
                    "where":{
                        "usr_id": Record["usr_id"]
                    }
                }).then(function (record) {
                    if (!record) return reply(req.translate('system', 'Record not found'));
                    if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                        // super-admin has all permissions
                    } else if (app.requirePermission.roles('allow', ['admin']).check(req.account)) {
                        if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                            return reply(req.translate('system', 'You do not have permissions update this user.'))
                        }
                    } else if (req.account['usr_id'] != record['usr_id']) {
                        return reply(req.translate('system', 'You do not have permissions update this user.'))
                    }

                    // Update fields
                    if (!S(Record.usr_login).isEmpty()) record.usr_login = Record.usr_login;
                    if (!S(Record.usr_email).isEmpty()) record.usr_email = Record.usr_email;
                    if (!S(Record.usr_gender).isEmpty()) record.usr_gender = Record.usr_gender;
                    if (!S(Record.usr_firstname).isEmpty()) record.usr_firstname = Record.usr_firstname;
                    if (!S(Record.usr_lastname).isEmpty()) record.usr_lastname = Record.usr_lastname;
                    if (!S(Record.usr_phone).isEmpty()) record.usr_phone = Record.usr_phone;
                    if (!S(Record.usr_birthday).isEmpty()) record.usr_birthday = Record.usr_birthday;
                    if (!S(Record.usr_role).isEmpty()) record.usr_role = Record.usr_role;
                    if (!S(Record.usr_status).isEmpty()) record.usr_status = Record.usr_status;
                    if (!S(Record.usr_image).isEmpty()) record.usr_image = Record.usr_image;
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
                        "User": record
                    });
                }
            }
        });

    // Delete a User
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
            app.models["User"].find({
                "where":{
                    "usr_id": req.params.id
                }
            }).then(function(record) {
                if (record) {
                    if (app.requirePermission.roles('allow', ['super-admin']).check(req.account)) {
                        // super-admin has all permissions
                    } else {
                        if (app.requirePermission.roles('allow', ['super-admin']).check(record)) {
                            return res.json({
                                code: -1,
                                errors: [{message: req.translate('system', 'You do not have permissions delete this user.')}]
                            });
                        }
                    }
                    record.destroy();
                }

                res.json({
                    code: 0,
                    message: req.translate('system', '__MODEL__ successfully deleted', {__MODEL__: 'User'})
                });
            });
        });
};
