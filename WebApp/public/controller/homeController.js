var pspApp = angular.module('PspHeader', [])
	.controller('homeController', ['$scope', function($scope) {
	$scope.template = {name: "home.html", url: "/../views/home.html"};
}]);

function headerController($scope) {
    $scope.header = {name: "header.html", url: "/../views/header.html"};
		$scope.footer = {name: "footer.html", url: "/../views/footer.html"};
		$scope.message = 'MrBiscotte';
}
