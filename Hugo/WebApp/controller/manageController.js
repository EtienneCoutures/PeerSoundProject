var pspApp = angular
    .module('pspApp', ['ngRoute'])
    .controller('homeController', homeController)
    .controller('musicController', musicController)
    .controller('contactController', contactController)

    pspApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
              templateUrl: 'views/home.html',
              controller: 'homeController'
            })
            .when('/about', {
              templateUrl: 'views/about.html',
              controller: 'aboutController'
            })
            .when('/contact', {
              templateUrl: 'views/contact.html',
              controller: 'contactController'
            })
    }]);

    function homeController($scope, $http, $location) {
      $scope.message = 'homeBro';
        // $scope.changeView = function (view) {
        //     $location.path(view);
        // }
    }

    function musicController($scope, $http, $location) {
      $scope.message = 'MrBiscotte';
        // $scope.changeView = function (view) {
        //     $location.path(view);
        // }
    }


    function homeController($scope, $http, $location) {
      $scope.message = 'Contact us! JK. This is just a demo.';
        // $scope.changeView = function (view) {
        //     $location.path(view);
        // }
    }
