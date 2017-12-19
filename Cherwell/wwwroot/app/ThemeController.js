'use strict';

/**
 * @version 1.0
 * @author Tom Toppel
 * @since 12/19/2017
 * @package app.navigation
 */
angular.module('TriangleApp')
    .controller('ThemeController', function ThemeController($scope, $location) {

        // set the default bootswatch theme name
        $scope.css = 'sandstone';

        // create the list of bootswatch theme name
        $scope.bootstraps = [
            { name: 'Basic (Cosmo)', url: 'cosmo' },
            { name: 'Cerulean', url: 'cerulean' },
            { name: 'Cyborg', url: 'cyborg' },
            { name: 'Darkly', url: 'darkly' },
            { name: 'Flatly', url: 'flatly' },
            { name: 'Journal', url: 'journal' },
            { name: 'Lumen', url: 'lumen' },
            { name: 'Paper', url: 'paper' },
            { name: 'Readable', url: 'readable' },
            { name: 'Sandstone', url: 'sandstone' },
            { name: 'Simplex', url: 'simplex' },
            { name: 'Slate', url: 'slate' },
            { name: 'Spacelab', url: 'spacelab' },
            { name: 'Superhero', url: 'superhero' },
            { name: 'United', url: 'united' },
            { name: 'Yeti', url: 'yeti' }
        ];
        $scope.setTheme = function (css) {
            $scope.css = css;
        };
    });
