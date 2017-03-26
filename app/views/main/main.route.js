'use strict';

var route = function( $stateProvider ){
    $stateProvider.state('main', {
        url: '/?settings',
        params: {},
        templateUrl: 'views/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
    });
};

route.$inject = ['$stateProvider'];

module.exports = route;
