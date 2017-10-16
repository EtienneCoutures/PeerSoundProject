var pspApp = angular.module('PspNavBar', []);

pspApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/home', {
				templateUrl : 'views/home.html',
				controller  : 'homeController',

function navController($scope) {
    $scope.header = {name: "navbar.html", url: "/../views/navbar.html"};
		$scope.message = 'Ca marche';
}

function homeController($scope) {
    $scope.header = {name: "home.html", url: "/../views/home.html"};
		$scope.message = 'MrBiscotte';
}
