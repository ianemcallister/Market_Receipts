angular
    .module('marketForm')
    .config(config);
/* @ngInject */
function config($routeProvider) {   
    $routeProvider
    .when('/:location/:date', {
        templateUrl: 'views/landingPage.htm',
        controller: 'landingPageController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
            suggestions: function($route, marketValues) {
                return marketValues.returnSuggestions({
                        location: $route.current.params.location,
                        date: $route.current.params.date
                    });
            },
            validations: function(marketValues) {
                return marketValues.returnAllValidations();
            }
        }
    })
    .otherwise({
        redirectTo: '/'
    });
}

function userAuthenticationService(authService) {
    authService.isLoggedIn();
};

function eventViewChanger(trafficValet, $route) {
    trafficValet.eventRoute($route.current.params.eventId, 
                            $route.current.params.hostId, 
                            $route.current.params.uid,
                            $route.current.params.section);
};