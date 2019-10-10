(function () {
    'use strict';
    app.controller('postcardController', [
        '$scope', '$location', function ($scope, $location) {
            $scope.Message="some message to be things to say!"
            $scope.go = function () {
                $location.path('/finish');
            };

            //clear cookies
            //persistenceService.clearCookieData();

        }]);
}).call(this);