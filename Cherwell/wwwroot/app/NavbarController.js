'use strict';

/**
 * @version 1.0
 * @author Tom Toppel
 * @since 12/19/2017
 * @package app.navigation
 */
angular.module('TriangleApp')
    .controller('NavbarController', function NavbarController($scope, $location) {

        $scope.routeIs = function (routeName) {
            return $location.path() === routeName;
        };

    });
