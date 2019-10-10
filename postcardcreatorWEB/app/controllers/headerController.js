(function () {
    'use strict';
    app.controller('headerController', [
        '$scope', '$location', function ($scope, $location) {
            $scope.openFaqQuest = function () {
                $scope.faqQuest.center().open();
            };
            $scope.closeFaqQuest = function () {
                $scope.faqQuest.close();
            };
            $scope.signOut = function () {
                authenticationService.logOut();
                $location.path('/home');
            }
            }]);
}).call(this);