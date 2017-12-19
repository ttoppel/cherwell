'use strict';
/**
 * APP CONTROLLER
 *
 * Handles data and operations that are used throughout the application.
 *
 * @version 1.0
 * @author Tom Toppel
 * @since 12/18/2017
 * @package app
 */
angular.module('TriangleApp')
    /**
     * AppController
     *
     */
    .controller('AppController', function ($scope, $timeout, growl, ApiService, AppMessageService) {
        $scope.msgText = "";
        $scope.row = "C";
        $scope.col = "7";

        $scope.editTriangle = {
            v1: { x: '30', y: '30' },
            v2: { x: '30', y: '20' },
            v3: { x: '40', y: '30' }
        };

        $scope.getTriangleByRowCol = function () {
            ApiService.getTriangle($scope.row, $scope.col).then(function (response) {
                // success handler
                $scope.msgText = JSON.stringify(response);
                AppMessageService.success("Get Triangle by Row/Col: " + $scope.msgText);
            }, function (error) {
                AppMessageService.httpError(error, "Get Triangle by Row/Col");
            });
        };

        $scope.getTriangleByCoordinates = function () {
            ApiService.getTriangle($scope.row, $scope.col).then(function (response) {
                // success handler
                $scope.coordsMsgText = JSON.stringify(response);
                AppMessageService.success("Get Triangle by Coordinates: " + $scope.msgText);
            }, function (error) {
                AppMessageService.httpError(error, "Get Triangle by Coordinates");
            });
        };
    });
