if (typeof define !== "function") {
    // to be able to require file from node
    var define = require("amdefine")(module);
}
/**
 * requirejs config
 */
define(function() {
    return {
        waitSeconds: 200,
        // Here paths are set relative to `/source/js` folder
        paths: {
            // JQuery
            "jQuery": "/js/jquery-2.1.3.min",
            "jQuery.ba-bbq": "/js/jquery.ba-bbq",

            // Base modules
            "underscore": "/node_modules/underscore/underscore-min",
            "async": "/node_modules/async/dist/async",
            "moment": "/node_modules/moment/min/moment-with-locales.min",
            "string": "/node_modules/string/lib/string",
            "screener": "/node_modules/screener/screener",
            "messageformat": "/node_modules/messageformat/messageformat",
            "validator": "/node_modules/validator/validator.min",
            "lodash": "/node_modules/lodash/index",

            // Theme 
            "jQueryMigrate": "/theme/plugins/jquery/jquery-migrate-1.1.0.min",
            "jQueryUI": "/theme/plugins/jquery-ui/ui/minified/jquery-ui.min",
            "jQuery.slimscroll": "/theme/plugins/slimscroll/jquery.slimscroll.min",
            "jQuery.gritter": "/theme/plugins/gritter/js/jquery.gritter",
            "bootstrap": "/theme/plugins/bootstrap/js/bootstrap.min",
            "passwordStrength": "/theme/plugins/password-indicator/js/password-indicator",
            "ColorAdmin": "/theme/js/apps",

            // Angular
            "angular": "/node_modules/angular/angular.min",
            "angular-filter": "/node_modules/angular-filter/dist/angular-filter.min",
            "ngRoute": "/node_modules/angular-route/angular-route",
            "ngCookies": "/node_modules/angular-cookies/angular-cookies.min",
            "ngTranslate": "/node_modules/angular-translate/dist",
            "ngSanitize": "/node_modules/angular-sanitize/angular-sanitize.min",
            "ngAnimate": "/node_modules/angular-animate/angular-animate.min",
            "restangular": "/node_modules/restangular/dist/restangular",

            // Bootstrap
            "ui.bootstrap": "/node_modules/angular-ui-bootstrap/dist/ui-bootstrap",
            "ui.bootstrap-tpls": "/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls",

            // Directive for data-tables
            "dataTables": "/js/directive/datatables"
        },

        shim: {
            // JQuery
            "jQuery": {
            },
            "jQuery.ba-bbq": {
                "deps": ["jQuery"]
            },

            // Theme 
            "jQueryMigrate": {
                "deps": ["jQuery"]
            },
            "jQueryUI": {
                "deps": ["jQuery"]
            },
            "jQuery.slimscroll": {
                "deps": ["jQuery"]
            },
            "jQuery.gritter": {
                "deps": ["jQuery"]
            },
            "bootstrap": {
                "deps": ["jQuery"]
            },
            "passwordStrength": {
                "deps": ["jQuery"]
            },
            "ColorAdmin": {
                "deps": ["jQuery", "jQueryUI", "jQueryMigrate", "bootstrap", "jQuery.slimscroll", "jQuery.gritter"],
                "exports": "App"
            },

            // Angular
            "angular": {
                "deps": ["jQuery"],
                "exports": "angular"
            },
            "angular-filter": {
                "deps": ["angular"]
            },
            "ngRoute": {
                "deps": ["angular"],
                "exports": "ngRoute"
            },
            "ngCookies": {
                "deps": ["angular"],
                "exports": "ngCookies"
            },
            "ngTranslate/angular-translate-loader-static-files/angular-translate-loader-static-files.min": {
                "deps": ["angular", "ngTranslate/angular-translate"]
            },
            "ngTranslate/angular-translate-loader-partial/angular-translate-loader-partial.min": {
                "deps": ["angular", "ngTranslate/angular-translate"]
            },
            "ngTranslate/angular-translate-storage-cookie/angular-translate-storage-cookie.min": {
                "deps": ["angular", "ngTranslate/angular-translate"]
            },
            "ngTranslate/angular-translate-storage-local/angular-translate-storage-local.min": {
                "deps": ["angular", "ngTranslate/angular-translate", "ngTranslate/angular-translate-storage-cookie/angular-translate-storage-cookie.min"]
            },
            "ngTranslate/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.min": {
                "deps": ["angular", "ngTranslate/angular-translate", "messageformat"]
            },
            "ngTranslate/angular-translate-handler-log/angular-translate-handler-log.min": {
                "deps": ["angular", "ngTranslate/angular-translate"]
            },
            "ngTranslate/angular-translate": {
                "deps": ["angular"]
            },
            "ngSanitize": {
                "deps": ["angular"],
                "exports": "ngSanitize"
            },
            "ngAnimate": {
                "deps": ["angular"],
                "exports": "ngAnimate"
            },
            "restangular": {
                "deps": ["angular", "underscore", "jQuery"],
                "exports": "restangular"
            },

            // Bootstrap
            "ui.bootstrap": {
                "deps": ["jQuery", "angular"]
            },
            "ui.bootstrap-tpls": {
                "deps": ["jQuery", "angular", "ui.bootstrap"]
            },

            // Directive for data-tables
            "dataTables": {
                "deps": ["angular"],
                "exports": "dataTables"
            }
        }
    };
});
