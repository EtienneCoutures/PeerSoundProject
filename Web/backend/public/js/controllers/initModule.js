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
    function($scope, $translatePartialLoader, $location, $translate, $cookies, Restangular, $route) {
      $translatePartialLoader.addPart('system');
      $translatePartialLoader.addPart('site');

      $scope.myself = false; // a set a false dés que ca remarche
      $scope.sender_usr = []
      console.log("on passe bien dans le init")

      $scope.Login = function() {
        console.log("login");
        $location.url('/login');
      };

      Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        if (data.code == -2) {
          console.log("refresh")
          $location.url('/login');
        }
        return data;
      });

      $scope.redirectTo = function(type, id) {
        return $location.url('/' + type +'/' + id)
      }

      $scope.$on('$routeChangeStart', function() {
        console.log("ca fait quoi ca?")
        /*if (!$scope.myself && $location.path() != '/login') {
        console.log("if")
          Restangular.one('auth', 'me').get().then(function(result) {
            $scope.myself = result.account;
            $scope.loaded = true;
            console.log("auth")
            console.log($scope.myself)
          }).catch(function(err) {
            $location.url('/login');
            $scope.loaded = true;
          });
        } else if ($location.path() == '/login') {
          $scope.loaded = true;
        }*/
      });

$scope.login = function(user) {
  $scope.myself = user;
};

$scope.goTo = function(path, id) {
  console.log("path")
  return $location.url((path + id).toString());
}


$scope.logout = function() {
  if ($scope.myself && $scope.myself.messages) $scope.myself.messages = null;
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
