define([
    'angular',
    'underscore',
    'string',
    'moment'
], function (angular, _, S, moment) {
    'use strict';
    return angular
        .module('friendModule', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/friend', {
                    templateUrl: '/partials/friend/index',
                    controller: 'FriendController'
                });
        }])
        .controller('FriendController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            'Restangular',
            function ($scope, $translatePartialLoader, $location, Restangular) {}
          };
