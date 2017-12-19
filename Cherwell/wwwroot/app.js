var triangleApp = angular.module('TriangleApp', [
    'ngAnimate'
    , 'ngSanitize'
    , 'ui.bootstrap'
    , 'ngResource'
    , 'ngRoute',
    ,'angular-growl'
]);

triangleApp.config(function ($routeProvider, $locationProvider, $httpProvider, growlProvider) {
    $locationProvider.hashPrefix('');
     $routeProvider.when('/home', {
         templateUrl: 'app/App.html',
         access: {
             isSecure: true
         }
     }).
     otherwise({
         redirectTo: '/home'
     });

    growlProvider.globalPosition('bottom-right'); //Options: top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
    growlProvider.globalTimeToLive({success: 5000, error: 60000, warning: 30000, info: 2000});
    $httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor);
});

triangleApp.controller("RouteController", function ($rootScope, $scope) {
});

angular.module('TriangleApp').run(function ($rootScope, $location) {
    // This runs before $(document).ready;
    console.log('$location', $location.$$absUrl);
    var protocol = $location.protocol();
    var host = $location.host();
    var port = $location.port();
    var contextPath = protocol + "://" + host;
    if ((port !== 80 && protocol == "http") || (port !== 443 && protocol == "https")) {
        contextPath += ":" + port;
    }
    console.log("contexPath = " + contextPath);
    $rootScope.contextPath = contextPath;
});


