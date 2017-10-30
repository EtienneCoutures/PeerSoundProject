var logged = true;

console.log("IjijIJ")
if (logged == true)
{
		console.log($location.absUrl)
		console.log("pas log")
}

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
});
