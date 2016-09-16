'use strict'

var ConferenceRoomLookup = angular.module("ConferenceRoomLookup", ["ui.bootstrap", "ui.router", "ngResource"]);
ConferenceRoomLookup.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

      //  ,"ngAnimate", "ngSanitize"
      //, $uibModal
  //       // code for dialog box

  //        var $ctrl = this;
  // $ctrl.items = ['item1', 'item2', 'item3'];

  // $ctrl.animationsEnabled = true;

  // $ctrl.open = function (size) {
  //   var modalInstance = $uibModal.open({
  //     animation: $ctrl.animationsEnabled,
  //     ariaLabelledBy: 'modal-title',
  //     ariaDescribedBy: 'modal-body',
  //     templateUrl: 'myModalContent.html',
  //     controller: 'ModalInstanceCtrl',
  //     controllerAs: '$ctrl',
  //     size: size,
  //     resolve: {
  //       items: function () {
  //         return $ctrl.items;
  //       }
  //     }
  //   });

  //   modalInstance.result.then(function (selectedItem) {
  //     $ctrl.selected = selectedItem;
  //   }, function () {
  //     $log.info('Modal dismissed at: ' + new Date());
  //   });
  // };

  // $ctrl.openComponentModal = function () {
  //   var modalInstance = $uibModal.open({
  //     animation: $ctrl.animationsEnabled,
  //     component: 'modalComponent',
  //     resolve: {
  //       items: function () {
  //         return $ctrl.items;
  //       }
  //     }
  //   });

  //   modalInstance.result.then(function (selectedItem) {
  //     $ctrl.selected = selectedItem;
  //   }, function () {
  //     $log.info('modal-component dismissed at: ' + new Date());
  //   });
  // };

  // $ctrl.toggleAnimation = function () {
  //   $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  // };


  //       //  code for dialog box

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