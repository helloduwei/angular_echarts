var mainApp = angular.module('mainApp', ['ngRoute','ngAnimate']);

mainApp.run(['$location', '$rootScope', '$window', '$timeout',
    function ($location, $rootScope, $window, $timeout) {
        $rootScope.page = {
            title : ''
        }
        $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
            
        });
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            
        });
    }
]);



