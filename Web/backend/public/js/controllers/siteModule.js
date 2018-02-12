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
                .when('/result', {
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

              /*$scope.redirectToUser = function(name) {
                Restangular.one('user/', name).get().then(function(result) {
                  if (result.User.usr_id == $scope.myself.id)
                    return $location.url('/myself')
                  return $location.url('/user/' + result.User.usr_id)
                });
              }*/
            }
        ])
        .controller('DownloadController', [
            '$scope',
            function ($scope) {
            }
        ])
        .controller('ResultController', [
            '$scope',
            function ($scope) {
              $scope.result = $scope.searchResult
              console.log($scope.result)
              //for (var member in $scope.searchResult) delete $scope.searchResult[member];
                console.log($scope.result.type)
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
                console.log($scope.users)
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
                console.log($scope.users)
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
