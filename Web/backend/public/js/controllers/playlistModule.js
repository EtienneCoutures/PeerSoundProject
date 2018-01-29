/**
 * Playlist Module
 */
define([
    'angular',
    'underscore',
    'string',
    'moment'
], function (angular, _, S, moment) {
    'use strict';
    return angular
        .module('playlistModule', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/playlist', {
                    templateUrl: '/partials/playlist/index',
                    controller: 'PlaylistController'
                })
                .when('/playlist/list', {
                    templateUrl: '/partials/playlist/list',
                    controller: 'PlaylistListController'
                })
                .when('/playlist/:playlist_id', {
                    templateUrl: '/partials/playlist/form',
                    controller: 'SavePlaylistController'
                });
        }])
        .controller('PlaylistListController', [
            '$scope',
            function ($scope) {
            }
        ])
        .controller('PlaylistController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            'Restangular',
            function ($scope, $translatePartialLoader, $location, Restangular) {
                var query = $location.search(),
                    pending = !!query.pending;
                $translatePartialLoader.addPart('playlist');

                $scope.PlaylistColumns = [{
                    field: 'playlist_name',
                    label: 'playlist_name',
                    sortable: true,
                    filter: 'text'
                }, {
                    field: 'playlist_style',
                    label: 'playlist_style',
                    sortable: true,
                    filter: 'text'
                }];

                $scope.loadPlaylistList = function (dtRequest, dtRefresh) {
                    if (typeof dtRequest != "object" || typeof dtRefresh != "function") return;

                    return Restangular.all('playlist').get('', {
                        where: dtRequest.filters,
                        limit: dtRequest.limit,
                        page: dtRequest.page,
                        sort: dtRequest.sort
                    }).then(function (result) {
                        dtRefresh(result);
                    });
                };

                $scope.PlaylistActions = function (refresh) {
                    return [{
                        class: 'btn btn-primary',
                        label: 'Edit',
                        action: function (row) {
                            $location.url('/playlist/' + row.playlist_id);
                        }
                    }, {
                        class: 'btn btn-primary',
                        label: 'Delete',
                        action: function (row) {
                            Restangular.one('playlist', row.playlist_id).remove().then(function(result) {
                                if (result.code == 0) return $location.url('/playlist');
                                $scope.errors = result.errors;
                                $scope.querying = false;
                            });
                            $location.url('/playlist/');
                        }
                    }]
                };
            }
        ])
        .controller('SavePlaylistController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            '$routeParams',
            'Restangular',
            '$translate',
            function ($scope, $translatePartialLoader, $location, $routeParams, Restangular, $translate) {
                var playlist_id = $routeParams.playlist_id;
                $translatePartialLoader.addPart('playlist');

                $scope.Playlist = {
                    isNew: true,
                    playlist_creator: $scope.myself.usr_id
                };
                if (Number.isInteger(parseInt(playlist_id))) {
                    $scope.Playlist.isNew = false;

                    Restangular.one('playlist', playlist_id).get().then(function(result) {
                        if (result.code != 0) return $location.url('/playlist');

                        $scope.Playlist = result.Playlist;
                    });
                }

                $scope.save = function() {
                    $scope.querying = true;

                    Restangular.all('playlist').post($scope.Playlist).then(function(result) {
                        if (result.code == 0) return $location.url('/playlist');
                        $scope.errors = result.errors;
                        $scope.querying = false;
                    });
                };
            }
        ]);
});
