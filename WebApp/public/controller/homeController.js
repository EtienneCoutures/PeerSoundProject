var pspApp = angular.module('PspHeader', [])
	.controller('homeController', ['$scope', function($scope) {
    $scope.header = {name: "header.html", url: "/../views/header.html"};
		$scope.template = {name: "home.html", url: "/../views/home.html"};
		$scope.footer = {name: "footer.html", url: "/../views/footer.html"};
}]);
