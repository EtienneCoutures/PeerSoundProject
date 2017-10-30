var pspApp = angular.module('pspApp', ['ngRoute']);

pspApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/music', {
				templateUrl : 'views/music.html',
				controller  : 'navController', 'musicController',
			})

function musicController($scope) {
    $scope.header = {name: "music.html", url: "/../views/music.html"};
		$scope.message = 'Ca marche';
}
