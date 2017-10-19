var pspApp = angular.module('PspHeader', []);

pspApp.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'headerController',
      });
    });

function headerController($scope) {
    $scope.header = {name: "navbar.html", url: "/../views/navbar.html"};
		$scope.message = 'MrBiscotte';
}
