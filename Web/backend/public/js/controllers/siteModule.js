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
                .when('/download', {
                    templateUrl: '/partials/site/download',
                    controller: 'DownloadController'
                });
        }])
        .controller('SiteController', [
            '$scope',
            'Restangular',
            '$location',
            '$rootScope',
            function ($scope, Restangular, $location, $rootScope) {
                $scope.goToDownload = function() {
                  $location.url("/download")
                }
            }
          ])
        .controller('DownloadController', [
            '$scope',
            function ($scope) {
            }
        ])
});
