var async, _, passport;

(function() {
    var libs = {},
        errors = [];
    [
        'async',
        'underscore',
        'passport'
    ].forEach(function (_package) {
            try {
                libs[_package] = require(_package);
            } catch (err) {
                errors.push(_package);
            }
        });
    if (errors.length > 0) throw new Error('Please install ' + errors.join(', ') + ' package(s) manually');

    async = libs.async;
    _ = libs.underscore;
    passport = libs.passport;
})();

function PermissionRules(options) {
    if (typeof options != "object") {
        options = {};
        options.redirectUrl = options;
    }
    this.redirectUrl = options.redirectUrl || '/';
    this.passwordStrategies = options.passwordStrategies || 'bearer';
    this.userProperty = options.userProperty || 'user';
    this.rolenameProperty = options.rolenameProperty || 'role_name';
    this.loginProperty = options.loginProperty || 'login';
}
PermissionRules.prototype.accessDenied = function (req, res, next) {
    var self = this;
    if (self.redirectUrl && res && req.originalUrl != self.redirectUrl && !req.originalUrl.match(/^\/api\//)) {
        res.redirect(self.redirectUrl);
    } else if (res) {
        //res.sendStatus(403);
        var error = new Error('permission denied');
        error.status = 403;
        next(error);
    } else {
        next('permission denied');
    }
};
PermissionRules.prototype.requirePermissions = function(rules) {
    var self = this;
    if (!Array.isArray(rules[0])) {
        rules = [rules];
    }

    var checker = function (req, res, next) {
        var args = Array.prototype.slice.call(arguments),
            allow = null;
        req = args.shift();
        next = args.pop();
        res = args.shift();

        var requireAuth = true;
        rules.forEach(function (rules) {
            var ruleAllow = rules[0] == 'allow';
            rules = rules[1];
            if (Object.keys(rules).length == 1 && rules.users !== undefined) {
                if (_.intersection(rules.users, ['*', '?']).length > 0 && ruleAllow) {
                    requireAuth = false;
                }
            }
        });
        if (requireAuth) {
            if (!req[self.userProperty]) {
                passport.authenticate(self.passwordStrategies, {session: true})(req, res, function (err) {
                    if (err) {
                        if (err.message == 'Token expired') {
                            return self.accessDenied(req, res, next);
                        }
                        if (next) return next(err);
                    }
                    return check();
                });
            } else {
                return check();
            }
        } else {
            if (!next) {
                return true;
            }
            next();
        }

        function check() {
            rules.forEach(function (rules) {
                var ruleAllow = rules[0] == 'allow',
                    keys = Object.keys(rules[1]),
                    rulesMatched = 0;
                rules = rules[1];
                keys.forEach(function (key) {
                    if (self.requirePermissions[key] != undefined) {
                        if (self.requirePermissions[key].call(self, ['allow', rules[key]])(req)) {
                            rulesMatched++;
                        }
                    } else {
                        rulesMatched++;
                    }
                });
                if (rulesMatched == keys.length && allow === null) {
                    allow = ruleAllow;
                }
            });
            if (allow === null) allow = true;
            if (!next) {
                return allow;
            }
            if (allow) {
                next();
            } else {
                self.accessDenied(req, res, next);
            }
        }
    };
    checker.check = function (account) {
        return checker({
            account: account
        });
    };
    return checker;
};
PermissionRules.prototype.requirePermissions.ips = function (allowed, ips) {
    var self = this;

    if (Array.isArray(allowed)) {
        ips = allowed.pop();
        allowed = allowed.shift();
    }

    allowed = allowed == 'allow';
    if (!Array.isArray(ips)) {
        ips = [ips];
    }

    var checker = function (req, res, next) {
        var args = Array.prototype.slice.call(arguments),
            clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
        req = args.shift();
        next = args.pop();
        res = args.shift();

        if (ips.length == 0) {
            allowed = true;
        } else if (ips.indexOf('*') >= 0 // anyone can access ?
            || ips.indexOf(clientIp) >= 0) { // this member can access ?
        } else {
            allowed = !allowed;
            ips.forEach(function (ip) {
                var starpos = ip.indexOf('*');
                if (starpos >= 0 && clientIp.substr(0, starpos) == ip.substr(0, starpos)) {
                    allowed = !allowed;
                }
            });
        }
        if (!next) {
            return allowed;
        }
        if (allowed) next();
        else self.accessDenied(req, res, next);
    };

    checker.check = function (account) {
        return checker({
            account: account
        });
    };
    return checker;
};
PermissionRules.prototype.requirePermissions.expression = function (allowed, expression) {
    var self = this;

    if (Array.isArray(allowed)) {
        expression = allowed.pop();
        allowed = allowed.shift();
    }

    allowed = allowed == 'allow';

    var checker = function (req, res, next) {
        var args = Array.prototype.slice.call(arguments),
            user = req[self.userProperty];
        req = args.shift();
        next = args.pop();
        res = args.shift();

        allowed = allowed ? eval(expression) : !eval(expression);
        if (!next) {
            return allowed;
        }
        if (allowed) next();
        else self.accessDenied(req, res, next);
    };

    checker.check = function (account) {
        return checker({
            account: account
        });
    };
    return checker;
};
PermissionRules.prototype.requirePermissions.users = function (allowed, users) {
    var self = this;

    if (Array.isArray(allowed)) {
        users = allowed.pop();
        allowed = allowed.shift();
    }

    allowed = allowed == 'allow';
    if (!Array.isArray(users)) {
        users = [users];
    }

    var checker = function (req, res, next) {
        var args = Array.prototype.slice.call(arguments);
        req = args.shift();
        next = args.pop();
        res = args.shift();
        if (users.length == 0) {
        } else if (users.indexOf('*') >= 0) { // anyone can access ?
        } else if (!req.isAuthenticated() && users.indexOf('?') >= 0) { // guest can access ?
        } else if (req.isAuthenticated() && users.indexOf('@') >= 0) { // guest can access ?
        } else if (req.isAuthenticated() && users.indexOf(req[self.userProperty][self.loginProperty]) >= 0) { // this member can access ?
        } else {
            allowed = !allowed;
        }

        if (!next) {
            return allowed;
        }
        if (allowed) next();
        else self.accessDenied(req, res, next);
    };

    checker.check = function (account) {
        return checker({
            account: account
        });
    };
    return checker;
};
PermissionRules.prototype.requirePermissions.roles = function (allow, roles) {
    var self = this;

    if (Array.isArray(allow)) {
        roles = allow.pop();
        allow = allow.shift();
    }

    allow = allow == 'allow';
    if (!Array.isArray(roles)) {
        roles = [roles];
    }

    var checker = function (req, res, next) {
        var args = Array.prototype.slice.call(arguments);
        req = args.shift();
        next = args.pop();
        res = args.shift();

        if (roles.length == 0) {
            if (!next) {
                return true;
            }
            next();
        } else if (!(req[self.userProperty])) {
            if (!next) return false;
            else self.accessDenied(req, res, next);
        } else {
            var role_name = req[self.userProperty];
            self.rolenameProperty.split('.').forEach(function(name) {
                if (role_name && role_name[name] != undefined) {
                    role_name = role_name[name];
                } else {
                    role_name = undefined;
                }
            });
            if (role_name !== undefined && !Array.isArray(role_name)) {
                role_name = [role_name];
            }
            var found = role_name !== undefined && _.intersection(roles, role_name).length > 0;
            if (!next) {
                return allow ? found : !found;
            }
            if (allow ? found : !found) next();
            else self.accessDenied(req, res, next);
        }
    };

    checker.check = function (account) {
        return checker({
            account: account
        });
    };
    return checker;
};

module.exports = function (options) {
    var permissionRules = new PermissionRules(options),
        requirePermissions = function() {
            return permissionRules.requirePermissions.apply(permissionRules, arguments);
        };

    _.each(_.functions(permissionRules.requirePermissions), function(name) {
        requirePermissions[name] = function() {
            return permissionRules.requirePermissions[name].apply(permissionRules, arguments);
        };
    });

    return requirePermissions;
};
