//app.controller('postcardController', function ($scope)
//{
//    $scope.Message = "Hello To Postcard Creator WEB";
//}
//);

(function () {
    'use strict';
    app.controller('postcardController', [
        '$scope', '$location', function ($scope, $location) {

            $scope.Message = "Hello To Postcard Creator WEB";

            $scope.go = function () {
                $location.path('/begin');
            };
        }]);
}).call(this);