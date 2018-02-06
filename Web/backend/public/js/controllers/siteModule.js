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
                .when('/friend', {
                    templateUrl: '/partials/site/friend',
                    controller: 'FriendController'
                });
        }])
        .controller('SiteController', [
            '$scope',
            'Restangular',
            '$location',
            function ($scope, Restangular, $location) {
              $scope.redirectToUser = function(name) {
                Restangular.one('user/', name).get().then(function(result) {
                  return $location.url('/user/' + result.User.usr_id)
                    /*$scope.errors = result.errors;
                    $scope.querying = false*/
                });
              }
            }
        ])
        .controller('DownloadController', [
            '$scope',
            function ($scope) {
            }
        ])
        .controller('FriendController', [
            '$scope',
            function ($scope) {
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
