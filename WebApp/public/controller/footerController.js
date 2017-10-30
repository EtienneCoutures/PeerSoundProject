var pspApp = angular.module('PspHeader', [])
	.controller('footerController', ['$scope', function($scope) {
	$scope.template = {name: "footer.html", url: "/../views/footer.html"};
}]);

function footerController($scope) {
    $scope.header = {name: "footer.html", url: "/../views/footer.html"};
		$scope.message = 'MrBiscotte';
}
