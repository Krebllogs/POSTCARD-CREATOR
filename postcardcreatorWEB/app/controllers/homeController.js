(function () {
    'use strict';
    app.controller('homeController', [
        '$scope', '$location', 'persistenceService', function ($scope, $location, persistenceService) {
            $scope.go = function () {
                $location.path('/postcard');
            };

            //clear cookies
            persistenceService.clearCookieData();

        }]);
}).call(this);