var pspApp = angular.module('PspFooter', []);

pspApp.config(function($routeProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'views/footer.html',
				controller  : 'footerController',
      });
    });

function footerController($scope) {
    $scope.header = {name: "home.html", url: "/../views/home.html"};
		$scope.message = 'MrBiscotte';
}
