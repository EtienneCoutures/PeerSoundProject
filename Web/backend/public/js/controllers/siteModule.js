define([
    'angular'
], function (angular) {
    'use strict';
    return angular
        .module('siteModule', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/site/index',
                    controller: 'SiteController'
                })
                .when('/login', {
                    templateUrl: '/partials/site/login',
                    controller: 'LoginController'
                })
                .when('/download', {
                    templateUrl: '/partials/site/download',
                    controller: 'DownloadController'
                })
                .when('/fav', {
                    templateUrl: '/partials/site/fav',
                    controller: 'FavController'
                })
                .when('/followed',{
                  templateUrl: '/partials/site/followed',
                  controller: 'FollowedController'
                })
                .when('/result/:type/:query', {
                  templateUrl: '/partials/site/result',
                  controller: 'ResultController'
                })
                .when('/follower', {
                    templateUrl: '/partials/site/follower',
                    controller: 'FollowerController'
                });
        }])
        .controller('SiteController', [
            '$scope',
            'Restangular',
            '$location',
            function ($scope, Restangular, $location) {

              Restangular.one("follow/followerNb/", $scope.myself.usr_id).get().then(function(result) {
                $scope.nbFollowers = result.count;
              });
            }
        ])
        .controller('DownloadController', [
            '$scope',
            function ($scope) {
            }
        ])
        .controller('ResultController', [
            '$scope',
            'Restangular',
            '$routeParams',
            function ($scope, Restangular, $routeParams) {
              $scope.type = $routeParams.type
              $scope.all  = {
                user : [],
                music : [],
                playlist: []
              }

              $scope.whereUser = function() { return { 'usr_login': $routeParams.query } }
              $scope.wherePlaylist = function() { return { 'playlist_name': $routeParams.query } }
              $scope.whereMusic = function() { return { 'music_name': $routeParams.query } }


              $scope.ptr = {
                user : $scope.whereUser(),
                music : $scope.whereMusic(),
                playlist : $scope.wherePlaylist()
              }

              var where = $scope.ptr[$scope.type];
              if ($scope.type != 'all') {
                Restangular.one($scope.type).get({ where
                }).then(function(result) {
                  $scope.all[$scope.type] = result
                })
              }
              else {
                where = $scope.ptr['user']
                Restangular.one('user').get({ where
                }).then(function(result) {
                  $scope.all['user'] = result
                })
                where = $scope.ptr['playlist']
                Restangular.one('playlist').get({ where
                }).then(function(result) {
                  $scope.all['playlist'] = result
                })
                where = $scope.ptr['music']
                Restangular.one('music').get({ where
                }).then(function(result) {
                  $scope.all['music'] = result
                })
              }
      }
    ])
        .controller('FollowedController', [
            '$scope',
            'Restangular',
            function ($scope, Restangular) {

              $scope.users = []

              $scope.getUsers = function() {
                for (var i = 0 ; i < $scope.followerList.length ; ++i) {
                    Restangular.one("user/", $scope.followerList[i].followed_usr_id).get().then(function(result) {
                        $scope.users.push(result.User)
                    });
                };

              };

              Restangular.one("follow/follower/", $scope.myself.usr_id).get().then(function(result) {
                  $scope.followerNb = result.count;
                  $scope.followerList = result.rows

                  $scope.getUsers()
              })



            }
        ])
        .controller('FollowerController', [
            '$scope',
            'Restangular',
            function ($scope, Restangular) {

              $scope.users = []

              $scope.getUsers = function() {
                for (var i = 0 ; i < $scope.followerList.length ; ++i) {
                    Restangular.one("user/", $scope.followerList[i].follower_usr_id).get().then(function(result) {
                        $scope.users.push(result.User)

                    });
                };
              };

              Restangular.one("follow/followed/", $scope.myself.usr_id).get().then(function(result) {
                  $scope.followerNb = result.count;
                  $scope.followerList = result.rows
                  $scope.getUsers()
              })



            }
        ])
        .controller('FavController', [
            '$scope',
            function ($scope) {
            }
        ])
        .controller('LoginController', [
            '$scope',
            'Restangular',
            '$location',
            function ($scope, Restangular, $location) {
                if ($scope.myself && $scope.myself.usr_id) $location.url('/')
                $scope.$view = 'login';
                $scope.User = {};

                $scope.signin = function() {
                    $scope.errors = null;
                    if ($scope.$view != 'login') return $scope.$view = 'login';

                    $scope.querying = true;
                    Restangular.all('auth/login').post({
                        login: $scope.User.login,
                        password: $scope.User.password,
                        remember: $scope.User.remember
                    }).then(function(result) {
                        $scope.querying = false;
                        if (result.code != 0) return $scope.errors = result.errors;

                        $scope.login(result.account);
                        $location.url('/');
                    });
                };

                $scope.lostpassword = function() {
                    $scope.errors = null;
                    if ($scope.$view != 'lostpassword') return $scope.$view = 'lostpassword';

                    $scope.querying = true;
                    Restangular.all('auth/lostpassword').post({
                        email: $scope.User.email
                    }).then(function(result) {
                        $scope.querying = false;
                        if (result.code != 0) return $scope.errors = result.errors;
                        $scope.message = result.message;
                    });
                }
            }
        ]);
});
