var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/app/', {
		templateUrl: '/partials/index.html',
		controller: 'userController'
	})
	.when('/app/users', {
		templateUrl: '/partials/user/index.html',
		controller: 'userController'
	})
	.when('/app/users/edit/:id', {
		templateUrl: '/partials/user/edit.html',
		controller: 'userController'
	})
	.when('/app/users/login', {
		templateUrl: '/partials/user/login.html',
		controller: 'userController'
	})
	.when('/app/users/show/:id', {
		templateUrl: '/partials/user/show.html',
		controller: 'userController'
	})
	.otherwise({
		redirectTo: '/app/'
	});

	$locationProvider.html5Mode(true);

});
