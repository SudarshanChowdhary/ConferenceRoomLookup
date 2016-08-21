'use strict'

var ConferenceRoomLookup = angular.module("ConferenceRoomLookup", ["ui.bootstrap", "ui.router", "ngResource"]);
ConferenceRoomLookup.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "views/conferenceroomlookup.html"
        })
         .state('searchresult', {
            url: "/searchresult",
            templateUrl: "views/searchResult.html"
        })

});