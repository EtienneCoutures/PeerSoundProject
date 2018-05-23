/**
 * Define angular application
 */
define([
    'require',
    'ColorAdmin',
    'angular',
    './app'
], function (require, App, angular) {
    'use strict';
    // starts the application
    App.init();
    $(function () {
        angular.bootstrap(document, ['MyApp']);
    });
});