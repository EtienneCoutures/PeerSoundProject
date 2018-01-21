var express = require('express'),
    passport = require('passport'),
    Cookies = require('cookies'),
    logger = global.logger;

module.exports = function (app) {
    var router = express.Router();

    app.use('/', router);

    /**
     * Home
     */
    router.get('/',
        function (req, res, next) {
            if (req.isAuthenticated()) {
                res.render('site/index');
            } else if (req.headers.authorization) {
                passport.authenticate('bearer', {session: false})(req, res, function (err) {
                    if (err) {
                        res.redirect('/login');
                    } else {
                        res.render('site/index');
                    }
                });
            } else {
                res.redirect('/login');
            }
        });

    /**
     * Login
     */
    router.get('/login',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.render('site/login', {
                __layout: "layouts/login",
                messages: req.flash('message')
            });
        });

    /**
     * SignUp
     */
    router.get('/signup',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.render('site/signup', {
                __layout: "layouts/login",
                messages: req.flash('message')
            });
        });

    /**
     * Logout
     */
    router.get('/logout',
        app.requirePermission([
            ['allow', {
                users: '@' // Connected only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            app.models.AccessToken.destroy({
                where: {
                    atok_id: req.account.accessTokenID
                }
            }).done(function() {
                req.logout();
                res.redirect('/');
            });
        });

    /**
     * Lost password
     */
    router.get('/lostpassword',
        app.requirePermission([
            ['allow', {
                users: '?' // Guest only
            }],
            ['deny', {
                users: '*'
            }]
        ]),
        function (req, res) {
            res.render('site/lostpassword', {
                __layout: "layouts/login",
                messages: req.flash('message')
            });
        });

    /**
     * Return json for swagger-ui
     * @see https://github.com/swagger-api/swagger-ui
     */
    router.get('/swagger.json',
        function (req, res) {
            var json = {
                "swagger": "2.0",
                "info": {
                    "title": "APIs",
                    "description": ""
                },
                "host": app.config.servers.self.host,
                "basePath": "/api",
                "schemes": ["http"],
                "tags": [{
                    "name": "Music",
                    "description": ""
                }, {
                    "name": "User",
                    "description": ""
                }],
                "paths": {
                    "/music": {
                        "get": {
                            "tags": ["Music"],
                            "summary": "List all [Music]",
                            "description": "",
                            "operationId": "listMusic",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "limit",
                                "in": "query",
                                "description": "Maximum number of items per page",
                                "required": false,
                                "type": "integer",
                                "default": 25
                            }, {
                                "name": "page",
                                "in": "query",
                                "description": "Requested page",
                                "required": false,
                                "type": "integer",
                                "default": 1
                            }, {
                                "name": "sort",
                                "in": "query",
                                "description": "Sort results by this field",
                                "required": false,
                                "type": "string",
                                "enum": ["music_name", "music_picture_default", "music_source"],
                                "default": ""
                            }, {
                                "name": "q[music_name]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/music"
                                        }
                                    }
                                }
                            }
                        },
                        "post": {
                            "tags": ["Music"],
                            "summary": "Add a new [Music]",
                            "description": "",
                            "operationId": "addMusic",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "Music",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "music_name": {
                                            "type": "string"
                                        },
                                        "music_description": {
                                            "type": "string"
                                        },
                                        "music_picture_default": {
                                            "type": "string"
                                        },
                                        "music_source": {
                                            "type": "string",
                                            "enum": ["youtube", "spotify", "deezer", "else"]
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/music"
                                    }
                                }
                            }
                        },
                        "put": {
                            "tags": ["Music"],
                            "summary": "Update a [Music]",
                            "description": "",
                            "operationId": "updateMusic",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "Music",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "music_id": {
                                            "type": "number"
                                        },
                                        "music_name": {
                                            "type": "string"
                                        },
                                        "music_description": {
                                            "type": "string"
                                        },
                                        "music_comment": {
                                            "type": "string"
                                        },
                                        "music_picture_default": {
                                            "type": "string"
                                        },
                                        "music_source": {
                                            "type": "string",
                                            "enum": ["youtube", "spotify", "deezer", "else"]
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/music"
                                    }
                                }
                            }
                        }
                    },
                    "/music/{musicId}": {
                        "get": {
                            "tags": ["Music"],
                            "summary": "Find [Music] by ID",
                            "description": "",
                            "operationId": "getMusicById",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "musicId",
                                "in": "path",
                                "description": "Id of [Music] to return",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/music"
                                    }
                                }
                            }
                        },
                        "delete": {
                            "tags": ["Music"],
                            "summary": "Delete a [Music]",
                            "description": "",
                            "operationId": "deleteMusic",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "musicId",
                                "in": "path",
                                "description": "Id of [Music] to delete",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/music"
                                    }
                                }
                            }
                        }
                    }, 
                    "/user": {
                        "get": {
                            "tags": ["User"],
                            "summary": "List all [User]",
                            "description": "",
                            "operationId": "listUser",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "limit",
                                "in": "query",
                                "description": "Maximum number of items per page",
                                "required": false,
                                "type": "integer",
                                "default": 25
                            }, {
                                "name": "page",
                                "in": "query",
                                "description": "Requested page",
                                "required": false,
                                "type": "integer",
                                "default": 1
                            }, {
                                "name": "sort",
                                "in": "query",
                                "description": "Sort results by this field",
                                "required": false,
                                "type": "string",
                                "enum": ["usr_login", "usr_email", "usr_firstname", "usr_lastname", "usr_role", "usr_status"],
                                "default": ""
                            }, {
                                "name": "q[usr_firstname]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }, {
                                "name": "q[usr_lastname]",
                                "in": "query",
                                "required": false,
                                "type": "string"
                            }, {
                                "name": "q[usr_role]",
                                "in": "query",
                                "required": false,
                                "type": "string",
                                "enum": ["super-admin", "admin", "member"]
                            }, {
                                "name": "q[usr_status]",
                                "in": "query",
                                "required": false,
                                "type": "string",
                                "enum": ["waiting", "active", "lock"]
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/definitions/user"
                                        }
                                    }
                                }
                            }
                        },
                        "post": {
                            "tags": ["User"],
                            "summary": "Add a new [User]",
                            "description": "",
                            "operationId": "addUser",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "User",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "usr_login": {
                                            "type": "string"
                                        },
                                        "usr_password": {
                                            "type": "string"
                                        },
                                        "usr_email": {
                                            "type": "string"
                                        },
                                        "usr_gender": {
                                            "type": "string",
                                            "enum": ["man", "woman"]
                                        },
                                        "usr_firstname": {
                                            "type": "string"
                                        },
                                        "usr_lastname": {
                                            "type": "string"
                                        },
                                        "usr_phone": {
                                            "type": "string"
                                        },
                                        "usr_birthday": {
                                            "type": "string"
                                        },
                                        "usr_role": {
                                            "type": "string",
                                            "enum": ["super-admin", "admin", "member"]
                                        },
                                        "usr_status": {
                                            "type": "string",
                                            "enum": ["waiting", "active", "lock"]
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/user"
                                    }
                                }
                            }
                        },
                        "put": {
                            "tags": ["User"],
                            "summary": "Update a [User]",
                            "description": "",
                            "operationId": "updateUser",
                            "consumes": ["application/json"],
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "User",
                                "in": "body",
                                "description": "",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "usr_id": {
                                            "type": "number"
                                        },
                                        "usr_login": {
                                            "type": "string"
                                        },
                                        "usr_password": {
                                            "type": "string"
                                        },
                                        "usr_email": {
                                            "type": "string"
                                        },
                                        "usr_gender": {
                                            "type": "string",
                                            "enum": ["man", "woman"]
                                        },
                                        "usr_firstname": {
                                            "type": "string"
                                        },
                                        "usr_lastname": {
                                            "type": "string"
                                        },
                                        "usr_phone": {
                                            "type": "string"
                                        },
                                        "usr_birthday": {
                                            "type": "string"
                                        },
                                        "usr_role": {
                                            "type": "string",
                                            "enum": ["super-admin", "admin", "member"]
                                        },
                                        "usr_status": {
                                            "type": "string",
                                            "enum": ["waiting", "active", "lock"]
                                        }
                                    }
                                }
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/user"
                                    }
                                }
                            }
                        }
                    },
                    "/user/{userId}": {
                        "get": {
                            "tags": ["User"],
                            "summary": "Find [User] by ID",
                            "description": "",
                            "operationId": "getUserById",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "userId",
                                "in": "path",
                                "description": "Id of [User] to return",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/user"
                                    }
                                }
                            }
                        },
                        "delete": {
                            "tags": ["User"],
                            "summary": "Delete a [User]",
                            "description": "",
                            "operationId": "deleteUser",
                            "produces": ["application/json"],
                            "parameters": [{
                                "name": "userId",
                                "in": "path",
                                "description": "Id of [User] to delete",
                                "required": true,
                                "type": "number"
                            }],
                            "responses": {
                                "200": {
                                    "description": "successful operation",
                                    "schema": {
                                        "$ref": "#/definitions/user"
                                    }
                                }
                            }
                        }
                    }
                },
                "definitions": {
                    "music": {
                        "type": "object",
                        "properties": {
                            "music_id": {
                                "type": "number"
                            },
                            "music_name": {
                                "type": "string"
                            },
                            "music_picture_default": {
                                "type": "string"
                            },
                            "music_source": {
                                "type": "string",
                                "enum": ["youtube", "spotify", "deezer", "else"]
                            }
                        }
                    },
                    "user": {
                        "type": "object",
                        "properties": {
                            "usr_id": {
                                "type": "number"
                            },
                            "usr_login": {
                                "type": "string"
                            },
                            "usr_email": {
                                "type": "string"
                            },
                            "usr_firstname": {
                                "type": "string"
                            },
                            "usr_lastname": {
                                "type": "string"
                            },
                            "usr_role": {
                                "type": "string",
                                "enum": ["super-admin", "admin", "member"]
                            },
                            "usr_status": {
                                "type": "string",
                                "enum": ["waiting", "active", "lock"]
                            }
                        }
                    }
                }
            };
            res.json(json);
        });
};
