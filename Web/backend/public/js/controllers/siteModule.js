define([
    'angular'
], function (angular) {
    'use strict';
    return angular
        .module('siteModule', [])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/site/homePage',
                    controller: 'SiteController'
                })
                .when('/signup',{
                    templateUrl: '/partials/site/signup',
                    controller: 'SignupController'
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
              console.log("ketamine", $location)

            /**  Restangular.one("follow/followerNb/", $scope.myself.usr_id).get().then(function(result) {
                $scope.nbFollowers = result.count;
              });
              Restangular.one('playlist').get({
                }).then(function(result) {
                  $scope.playlist = result
                })*/
            }
          ])
          .controller('SignupController', [
            '$scope',
            '$http',
            '$document',
            function ($scope, $http, $document) {
              $scope.signUp = function() {
                var url = "https://localhost:8000/api/signup"
                var data = document.getElementById("FormTest")
                var config = {
                  headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
                }
                $http.post(url, data, config)
                .success(function (data, status, headers, config) {
                  console.log("success")
                })
                .error(function (data, status, header, config) {
                  console.log("fail")
                });
              /*  if (document.getElementById('password').value != document.getElementById('confirm').value) {
                  return alert('Passwords do not match');
                }
                document.forms["signup-form"].submit();*/
              }
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
              $scope.query = $routeParams.query

              $scope.display = 'all'



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
            '$route',
            function ($scope, Restangular, $route) {
              Restangular.one("follow/follower/", $scope.myself.usr_id).get().then(function(result) {
                  $scope.followedNb = result.count;
                  $scope.followedList = result.rows
              })

              $scope.unFollow = function(user_id) {
                Restangular.one('follow').remove({
                     "followed_usr_id": user_id,
                     "follower_usr_id": $scope.myself.usr_id
                    }).then(function(result) {
                   if (result.code == 0)  {
                     $route.reload()
                   }
                     $scope.errors = result.errors;
                     $scope.querying = false;
                 });
             }
            }
        ])
        .controller('FollowerController', [
            '$scope',
            'Restangular',
            '$route',
            function ($scope, Restangular, $route) {
              Restangular.one("follow/followed/", $scope.myself.usr_id).get().then(function(result) {
                  $scope.followerNb = result.count;
                  $scope.followerList = result.rows
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
              console.log("Login Controller")
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
                        //scope.User.login(result.account);
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
