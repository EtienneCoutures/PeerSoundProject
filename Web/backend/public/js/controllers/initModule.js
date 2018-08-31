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
    function($scope, $translatePartialLoader, $location, $translate, $cookies, Restangular, $route)   {
      $translatePartialLoader.addPart('system');
      $translatePartialLoader.addPart('site');
      $scope.$id = 1

      $scope.myself = false; // a set a false dés que ca remarche
      $scope.sender_usr = []
      $scope.User = {};
      console.log("on passe bien dans le init")

      $scope.Login = function() {
        console.log("login");
        $location.url('/login');
      };

      Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        console.log(data)
        if (data.code == -2) {
          console.log("refresh")
          $location.url('/');
        }
        return data;
      });

      $scope.redirectTo = function(type, id) {
        return $location.url('/' + type +'/' + id)
      }

      $scope.$on('$routeChangeStart', function() {
        console.log($scope)
        Restangular.one('auth', 'me').get().then(function(result) {
          $scope.myself = result.account;
          $scope.loaded = true;
          console.log("auth")
          console.log($scope.myself)
        }).catch(function(err) {
          $scope.myself = false;
        });
        /*(!$scope.myself) {
        console.log("if")
        }*/
      });

$scope.signin = function() {
  $scope.errors = null;
  console.log($scope.User);
  $scope.querying = true;
  Restangular.all('auth/login').post({
      login: $scope.User.email,
      password: $scope.User.password,
      remember: true
  }).then(function(result) {
      console.log(result);
      $scope.querying = false;
      if (result.code != 0) return $scope.errors = result.errors;
      $scope.myself = result.account;
  })
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
