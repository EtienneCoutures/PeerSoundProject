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
                .when('/playlist/new', {
                  templateUrl : 'partials/playlist/new',
                  controller: 'NewPlaylistController'
                })
                .when('/playlist/:playlist_id', {
                  /*  templateUrl: '/partials/playlist/form',
                    controller: 'SavePlaylistController'*/
                    templateUrl: 'partials/playlist/admin',
                    controller: 'AdminPlaylistController'
                });
        }])
        .controller('PlaylistListController', [
            '$scope',
            '$location',
            "Restangular",
            function ($scope, $location, Restangular) {
              $scope.goTo = function(path, id) {
                return $location.url((path + id).toString());
              }

              $scope.userPlaylist = []
              Restangular.all('playlist').get('', {
                  where: {
                    playlist_creator: $scope.myself.usr_id
                  }
              }).then(function (result) {
                for (var i = 0 ; i != result.length ; ++i) {
                  $scope.userPlaylist.push(result[i])
                }
              });

            }
          ])
          .controller('AdminPlaylistController', [
            '$scope',
            'Restangular',
            function ($scope, Restangular) {
              console.log("ketamine")
              $scope.followersId = []
              $scope.followers = []
              Restangular.all('follow').get('', {
                where : {
                  followed_usr_id: $scope.myself.usr_id
                }
              }).then(function(result) {
                for (var i = 0 ; i != result.length ; ++ i) {
                  $scope.followersId.push(result[i].follower_usr_id)
                }

              }).then(function() {
                for (var i = 0 ; i != $scope.followersId.length ; ++i) {
                  Restangular.one('user/' + $scope.followersId[i]).get().then(function(act_user){
                    $scope.followers.push(act_user.User)
                  })
                }
              })
              // C'est sale et honnetement je m'en veux
            }
          ])
          .controller('NewPlaylistController', [
            '$scope',
            'Restangular',
            '$timeout',
            function ($scope, Restangular, $timeout) {
              $scope.playlist = {}
              $scope.playlist.playlist_creator = $scope.myself.usr_id
              $scope.savePlaylist = function(params) {
                Restangular.all('playlist').post($scope.playlist).then(function(result) {
                    if (result.code == 0)  {
                      $scope.playlist.playlist_name = "";
                      $scope.playlist.playlist_style = "";
                      $scope.playlist.playlist_description = "";
                      $scope.playlist.playlist_comment  = "";
                      $scope.displayCreated()
                    }
                    $scope.errors = result.errors;
                    $scope.querying = false;
                });
              }

              $scope.playlistCreated = false;

                 $scope.displayCreated = function() {
                    $scope.playlistCreated = true;
                    $timeout(function() {
                       $scope.playlistCreated = false;
                    }, 3000);
                 };

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
