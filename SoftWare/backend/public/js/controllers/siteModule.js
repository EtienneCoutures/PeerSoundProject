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
                });
        }])
        .controller('SiteController', [
            '$scope',
            'Restangular',
            '$location',
            '$rootScope',
            function ($scope, Restangular, $location, $rootScope) {
              console.log("log de tout le scope = >")
              console.log($scope)
              console.log($rootScope.name)
              console.log("log de scope myself = >")
              console.log($scope.myself)
            }
          ])
          .controller('SignupController', [
            '$scope',
            '$http',
            '$document',
            '$location',
            function ($scope, $http, $document, $location) {
              $scope.passwordConfirmation = ""
              $scope.newUser = {
                email:"",
                password: "",
                login:""
              };
              $scope.signUp = function() {
                  var url = "https://localhost:8000/signup"
                  var data = {login: $scope.newUser.login, password: $scope.newUser.password}
                  console.log(data)
                  var config = {
                    headers : {
                      'Content-Type': 'application/json;charset=utf-8;'
                    }
                  }
                $http.post(url, data, config).then(
                  function(response){
                    console.log(response)
                    $scope.myself = response;
                    console.log("la bas")
                    $location.url("/")
                  },
                  function(response){
                    console.log("la ici")
                    console.log(response)
                    return;
                  }
                );
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
                        remember: true
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
