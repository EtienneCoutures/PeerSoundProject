/**
 * User Module
 */
define([
    'angular',
    'underscore',
    'string',
    'moment'
], function (angular, _, S, moment) {
    'use strict';
    return angular
        .module('userModule', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/user', {
                    templateUrl: '/partials/user/index',
                    controller: 'UserController'
                })
                .when('/user/:usr_id', {
                    templateUrl: '/partials/user/form',
                    controller: 'SaveUserController'
                });
        }])
        .controller('UserController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            'Restangular',
            function ($scope, $translatePartialLoader, $location, Restangular) {
                var query = $location.search(),
                    pending = !!query.pending;
                $translatePartialLoader.addPart('user');

                $scope.UserColumns = [{
                    field: 'usr_login',
                    label: 'usr_login',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'usr_email',
                    label: 'usr_email',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'usr_firstname',
                    label: 'usr_firstname',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'usr_lastname',
                    label: 'usr_lastname',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'usr_role',
                    label: 'usr_role',
                    sortable: true,
                    filter: 'enum',
                    values: ["super-admin","admin","member"]
                }, {
                    field: 'usr_status',
                    label: 'usr_status',
                    sortable: true,
                    filter: 'enum',
                    values: ["waiting","active","lock"]
                }];

                $scope.loadUserList = function (dtRequest, dtRefresh) {
                    if (typeof dtRequest != "object" || typeof dtRefresh != "function") return;

                    return Restangular.all('user').get('', {
                        where: dtRequest.filters,
                        limit: dtRequest.limit,
                        page: dtRequest.page,
                        sort: dtRequest.sort
                    }).then(function (result) {
                        dtRefresh(result);
                    });
                };

                $scope.UserActions = function (refresh) {
                    return [{
                        class: 'btn btn-primary',
                        label: 'Edit',
                        action: function (row) {
                            $location.url('/user/' + row.usr_id);
                        }
                    }]
                };
            }
        ])
        .controller('SaveUserController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            '$routeParams',
            'Restangular',
            '$translate',
            function ($scope, $translatePartialLoader, $location, $routeParams, Restangular, $translate) {
                var usr_id = $routeParams.usr_id;
                $translatePartialLoader.addPart('user');

                $scope.User = {
                    isNew: true
                };
                if (Number.isInteger(parseInt(usr_id))) {
                    $scope.User.isNew = false;

                    Restangular.one('user', usr_id).get().then(function(result) {
                        if (result.code != 0) return $location.url('/user');

                        $scope.User = result.User;
                    });
                }

                $scope.save = function() {
                    $scope.querying = true;

                    Restangular.all('user').post($scope.User).then(function(result) {
                        if (result.code == 0) return $location.url('/user');
                        $scope.errors = result.errors;
                        $scope.querying = false;
                    });
                };
            }
        ]);
});