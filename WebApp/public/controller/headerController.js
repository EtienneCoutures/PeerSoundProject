var pspApp = angular.module('PspHeader', [])
	.controller('headerController', ['$scope', function($scope) {
	$scope.template = {name: "header.html", url: "/../views/header.html"};
}]);

/*pspApp.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'headerController',
      });
    });*/

/*pspApp.run(function($templateCache) {
   $templateCache.put('../views/navbar.html', '../views/navbar.html');
});*/

function headerController($scope) {
    $scope.header = {name: "header.html", url: "/../views/header.html"};
		$scope.message = 'MrBiscotte';
}
