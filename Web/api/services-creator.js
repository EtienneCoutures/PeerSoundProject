var _         = require('underscore'),
    Emitter   = require('component-emitter'),
    Promise   = require('bluebird');

module.exports = function (options) {
    /**
     * @param options
     * @returns {module.ServiceCreator}
     * @constructor
     */
    function ServiceCreator(options) {
        if (!(this instanceof ServiceCreator)) return new ServiceCreator(options);
        options = options || {};
        this.createService();
        return this;
    }

    /**
     * @returns {ServiceCreator}
     */
    ServiceCreator.prototype.createService = function() {
        var self = this;

        self.Service = function(options) {
            if (!(this instanceof self.Service)) return new self.Service(options);
            options = options || {};
            Emitter(this);
            return this;
        };
        return this;
    };

    /**
     * @param {String} name Function name
     * @param {Function} fct Function
     * @returns {ServiceCreator}
     */
    ServiceCreator.prototype.add = function(name, fct) {
        this.Service.prototype[name] = fct;
        return this;
    };

    /**
     * @returns {ServiceCreator}
     */
    ServiceCreator.prototype.promisify = function() {
        var self = this;

        _.each(_.functions(self.Service.prototype), function (name) {
            var func = self.Service.prototype[name];
            self.Service.prototype[name] = function () {
                var self = this,
                    args = Array.prototype.slice.call(arguments),
                    cb = args.pop();

                if (typeof cb != "function") {
                    if (cb != undefined) args.push(cb);
                    cb = function () {
                    };
                }

                return (new Promise(function (resolve, reject) {
                    var me = this;
                    var response = function () {
                        var args = Array.prototype.slice.call(arguments),
                            err = args.shift();

                        cb.apply(self, arguments);
                        if (err) return reject(err);
                        return resolve.apply(me, args);
                    };
                    args.push(response);
                    return func.apply(self, args);
                }));
            };
        });
        return this;
    };

    /**
     * @returns {Function} Service constructor
     */
    ServiceCreator.prototype.get = function() {
        this.Service.prototype.runHook = function () {
            var self = this,
                args = Array.prototype.slice.call(arguments),
                hook = args.shift();

            return Promise.each(self.listeners(hook), function (hook) {
                return new Promise(function (resolve, reject) {
                    var params = args.slice(0);
                    params.push(function () {
                        var args = Array.prototype.slice.call(arguments),
                            err = args.shift();
                        if (err) return reject(err);
                        return resolve.apply(self, args);
                    });
                    var result = hook.apply(self, params);
                    if (result instanceof Promise) {
                        result.then(resolve).catch(reject);
                    }
                });
            }).return();
        };
        return this.Service;
    };

    return new ServiceCreator(options);
};
