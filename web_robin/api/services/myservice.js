var _              = require('underscore'),
    ServiceCreator = require('../services-creator');

module.exports = function (app) {
    /**
     * @return {{
     *     myFunction: Function
     * }}
     */
    var Service = ServiceCreator()
        // TODO Your asynchronous functions (They will be promised)
        .add('myFunction', function (param, callback) {
            var self = this;

            self.runHook('beforeMyFunction', 'TOTO').then(function () {
                self.emit('log', 'running my function....');

                // TODO FIX ME

                return self.runHook('afterMyFunction');
            }).then(function () {
                callback();
            });
        })
        // promisify all async functions defined before
        .promisify()
        // TODO Your synchronous functions (or promised functions)
        .get();

    app.services.MyService = Service();
};
