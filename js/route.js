mainApp.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider
            .when('/', {
                name:'main',
                templateUrl: 'pages/main.html',
                controller: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });

    }
]);