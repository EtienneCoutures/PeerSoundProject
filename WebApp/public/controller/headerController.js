var pspApp = angular.module('PspHeader', [])
	.controller('headerController', ['$scope', function($scope) {
	$scope.template = {name: "navbar.html", url: "/../views/navbar.html"};
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
    $scope.header = {name: "navbar.html", url: "/../views/navbar.html"};
		$scope.message = 'MrBiscotte';
}
