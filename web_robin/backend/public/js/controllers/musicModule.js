/**
 * Music Module
 */
define([
    'angular',
    'underscore',
    'string',
    'moment'
], function (angular, _, S, moment) {
    'use strict';
    return angular
        .module('musicModule', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/music', {
                    templateUrl: '/partials/music/index',
                    controller: 'MusicController'
                })
                .when('/music/:music_id', {
                    templateUrl: '/partials/music/form',
                    controller: 'SaveMusicController'
                });
        }])
        .controller('MusicController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            'Restangular',
            function ($scope, $translatePartialLoader, $location, Restangular) {
                var query = $location.search(),
                    pending = !!query.pending;
                $translatePartialLoader.addPart('music');

                $scope.MusicColumns = [{
                    field: 'music_name',
                    label: 'music_name',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'music_picture_default',
                    label: 'music_picture_default',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'music_source',
                    label: 'music_source',
                    sortable: true,
                    filter: 'enum',
                    values: ["youtube","spotify","deezer","soundcloud", "else"]
                }];

                $scope.loadMusicList = function (dtRequest, dtRefresh) {
                    if (typeof dtRequest != "object" || typeof dtRefresh != "function") return;

                    return Restangular.all('music').get('', {
                        where: dtRequest.filters,
                        limit: dtRequest.limit,
                        page: dtRequest.page,
                        sort: dtRequest.sort
                    }).then(function (result) {
                        dtRefresh(result);
                    });
                };

                $scope.MusicActions = function (refresh) {
                    return [{
                        class: 'btn btn-primary',
                        label: 'Edit',
                        action: function (row) {
                            $location.url('/music/' + row.music_id);
                        }
                    }, {
                        class: 'btn btn-primary',
                        label: 'Delete',
                        action: function (row) {
                            Restangular.one('music', row.music_id).remove().then(function(result) {
                                if (result.code == 0) return $location.url('/music');
                                $scope.errors = result.errors;
                                $scope.querying = false;
                            });
                            $location.url('/music/');
                        }
                    }]
                };
            }
        ])
        .controller('SaveMusicController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            '$routeParams',
            'Restangular',
            '$translate',
            function ($scope, $translatePartialLoader, $location, $routeParams, Restangular, $translate) {
                var music_id = $routeParams.music_id;
                $translatePartialLoader.addPart('music');

                $scope.Music = {
                    isNew: true,
                    usr_id: $scope.myself.usr_id
                };
                if (Number.isInteger(parseInt(music_id))) {
                    $scope.Music.isNew = false;

                    Restangular.one('music', music_id).get().then(function(result) {
                        if (result.code != 0) return $location.url('/music');

                        $scope.Music = result.Music;
                    });
                }

                $scope.save = function() {
                    $scope.querying = true;

                    Restangular.all('music').post($scope.Music).then(function(result) {
                        if (result.code == 0) return $location.url('/music');
                        $scope.errors = result.errors;
                        $scope.querying = false;
                    });
                };
            }
        ]);
});
