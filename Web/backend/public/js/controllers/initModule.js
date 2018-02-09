/**
 * Init Module (loaded on page load)
 */
define([
    'angular',
    'moment'
], function(angular, moment) {
    'use strict';
    return angular
        .module('initModule', [])
        .controller('InitController', [
            '$scope',
            '$translatePartialLoader',
            '$location',
            '$translate',
            '$cookies',
            'Restangular',
            function($scope, $translatePartialLoader, $location, $translate, $cookies, Restangular) {
                $translatePartialLoader.addPart('system');
                $translatePartialLoader.addPart('site');

                $scope.myself = false;

                Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                    if (data.code == -2) {
                        $location.url('/login');
                    }
                    return data;
                });

                $scope.$on('$routeChangeStart', function() {
                    if (!$scope.myself && $location.path() != '/login') {
                        Restangular.one('auth', 'me').get().then(function(result) {
                            $scope.myself = result.account;
                            $scope.loaded = true;
                        }).catch(function(err) {
                            $location.url('/login');
                            $scope.loaded = true;
                        });
                    } else if ($location.path() == '/login') {
                        $scope.loaded = true;
                    }
                });

                $scope.login = function(user) {
                    $scope.myself = user;
                    $scope.follow()
                  };

                $scope.follow = function() {
                if ($scope.myself.usr_id)
                {
                  Restangular.one("follow/followed/", $scope.myself.usr_id).get().then(function(result) {
                    console.log(result.Follow.length)
                    $scope.nbFollowed = result.Follow.length;
                  });
                  Restangular.one("follow/follower/", $scope.myself.usr_id).get().then(function(result) {
                    console.log(result.Follow.length)
                    $scope.nbFollowers = result.Follow.length;
                  });
                }
              }

                $scope.logout = function() {
                    $scope.myself = null;
                    $location.url('/login');
                    Restangular.one('auth', 'logout').get().then(function(result) {
                    });
                };

                if (!$translate.use()) {
                    $translate.use($scope.language);
                }
            }
        ]);
});
