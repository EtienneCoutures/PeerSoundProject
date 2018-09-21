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
                Restangular.one('user').get({
                  where: {
                    usr_email: 'etienne.coutures@epitech.eu'
                  }
                }).then(function(result) {
                    console.log(result)
                }).catch(function(err) {
                  console.log(err)
                })

              /*  Restangular.all('user').get({'where': {'usr_email': 'etienne.coutures@epitech.eu'}}).then(function(result) {
                  if (result.code == 1) {
                    console.log("error");
                  }
                  console.log('success')
                  console.log(result);
                })
*/

            }
          ])
        .controller('DownloadController', [
            '$scope',
            function ($scope) {
            }
        ])
});
