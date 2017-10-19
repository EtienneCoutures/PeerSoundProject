var pspApp = angular.module('PspHome', []);

pspApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'homeController',
			});
		});

function homeController($scope) {
    $scope.header = {name: "home.html", url: "/../views/home.html"};
		$scope.message = 'MrBiscotte';
}
