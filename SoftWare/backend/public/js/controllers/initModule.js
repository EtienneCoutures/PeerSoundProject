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
    '$route',
    '$rootScope',
    function($scope, $translatePartialLoader, $location, $translate, $cookies, Restangular, $route, $rootScope  )   {
      $translatePartialLoader.addPart('system');
      $translatePartialLoader.addPart('site');
      $scope.$id = 1
      $scope.sender_usr = []

      Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        console.log(data)
        if (data.code == -2) {
          console.log("refresh")
          $location.url('/');
        }
        return data;
      });

      $rootScope.redirectTo = function(type, id) {
        return $location.url('/' + type +'/' + id)
      }

      $rootScope.goTo = function(path, id) {
        console.log("path")
        return $location.url((path + id).toString());
      }

      if (!$translate.use()) {
        $translate.use($scope.language);
      }
    }
  ]);
});
