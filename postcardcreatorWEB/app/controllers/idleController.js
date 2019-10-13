(function () {
    'use strict';
    app.controller('idleController', [
        '$scope', 'Idle', 'Keepalive', '$uibModal', '$window', '$timeout', function ($scope, Idle, Keepalive, $uibModal, $window, $timeout) {
            $scope.started = false;
            $scope.logged = true;

            function closeModals() {
                if ($scope.warning) {
                    $scope.warning.close();
                    $scope.warning = null;
                }
                if ($scope.timedout) {
                    $scope.timedout.close();
                    $scope.timedout = null;
                }
            }

            function checkToLogSession() {
                //call TimeOutLog service wenen customerID is not null
                //if (typeof persistenceService.getCookieData() !== 'undefined') {
                //    customerService.timeoutLogging(persistenceService.getCookieData()).then((function (results) {
                //        //alertsService.logSuccess($translatefilter('IDLEREDIRECT'));
                //    }),
                //        function (response) {
                //            alertsService.logError($translatefilter('AppMsg.ERRUPDATECUSTOMER'));
                //        })
                //}
            };

            function redirect() {
                $window.location.href = '/#/';
            };

            $scope.$on('IdleStart', function () {
                closeModals();
                $scope.warning = $uibModal.open({
                    templateUrl: 'warning-dialog.html',
                    windowClass: 'modal-danger',
                    backdrop: 'static',
                    keyboard: false
                });
            });

            $scope.$on('IdleEnd', function () {
                closeModals();
            });

            $scope.$on('IdleTimeout', function () {
                closeModals();
                $scope.timedout = $uibModal.open({
                    templateUrl: 'timedout-dialog.html',
                    windowClass: 'modal-danger',
                    backdrop: 'static',
                    keyboard: false
                });
                //log if session exists
                checkToLogSession();
                //redirect, with 5 second timeout delay
                $timeout(redirect, 5000);
            });

            $scope.start = function () {
                closeModals();
                Idle.watch();
                $scope.started = true;
            };

            $scope.stop = function () {
                closeModals();
                Idle.unwatch();
                $scope.started = false;
            };
        }])
        .config(function (IdleProvider, KeepaliveProvider) {
            IdleProvider.idle(300);//25 minutes=1500 29 minutes=1740 59 minutes=3540
            IdleProvider.timeout(60);//5 minutes = 300
            KeepaliveProvider.interval(10);
            IdleProvider.autoResume('notIdle')
        });
}).call(this);