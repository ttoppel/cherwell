/**
 *  API SERVICE.
 *
 *  A service to handle loading various data from Artwork Services.
 *
 * @version 1.0
 * @author Tom Toppel
 * @since 12/19/2017
 * @package app
*/
angular.module('TriangleApp')

/**
 * API Service
 *
 * @param angular.scope     $resource
 * @param angular.constant  apiUrls
 * @param angular.scope     $rootScope
 * @param angular.service    $q
 * @param angular.service    $cacheFactory
 * @returns                 ApiService instance
 */
    .service('ApiService',
        function ($resource, apiUrls, growl, $rootScope, $q, $cacheFactory) {
            'use strict';
            var trianglePath = $rootScope.contextPath + apiUrls.triangle;
            console.log("triangle path = " + trianglePath);
            var Triangle = $resource(
                $rootScope.contextPath + apiUrls.triangle + "/:row" + "/:col",
                 {row: "@row", col: "@col"},
                {
                    'update': { method:'PUT' }
                }
            );

            this.getTriangles = function () {
                var params = {};
                return Triangle.query(params).$promise;
            };

            this.getTriangle = function (row, col) {
                var params = {row: row, col: col};
                return Triangle.get(params).$promise;
            };

            this.getTriangleByCoordinates = function (triangle) {
                var params = {};
                return Triangle.save(params, triangle).$promise;
            };

        });