var pspApp = angular.module('PSPNavBar', []);

pspApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'navController', 'homeController',
			})

function navController($scope) {
    $scope.header = {name: "navbar.html", url: "/../views/navbar.html"};
}

function homeController($scope) {
    $scope.header = {name: "navbar.html", url: "/../views/navbar.html"};
}
