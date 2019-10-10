(function () {
    'use strict';
    app.controller('homeController', [
        '$scope', '$location', function ($scope, $location) {
            $scope.go = function () {
                $location.path('/postcard');
            };

            //clear cookies
            //persistenceService.clearCookieData();

        }]);
}).call(this);