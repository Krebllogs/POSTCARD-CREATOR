﻿var app = angular.module('postcardApp',
    ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'kendo.directives', 'ngIdle', 'LocalStorageModule', 'ngCookies']);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/home.view.html"
    });

    $routeProvider.when("/postcard", {
        controller: "postcardController",
        templateUrl: "app/views/postcard.view.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
    $locationProvider.hashPrefix('');
});

//app.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    //if (!$httpProvider.defaults.headers.get) {
    //    $httpProvider.defaults.headers.get = {};
    //}

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    //$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

    // extra
    //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    //$httpProvider.interceptors.push('authenticationInterceptorService');
//}]);


app.run(['Idle', function (Idle) {
    Idle.watch();
}]);