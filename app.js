'use strict'

var ConferenceRoomLookup = angular.module("ConferenceRoomLookup", ["ui.bootstrap", "ui.router", "ngResource", "ui.grid"]);
ConferenceRoomLookup.config(function($stateProvider, $urlRouterProvider) {
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