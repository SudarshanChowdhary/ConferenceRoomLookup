'use strict'

ConferenceRoomLookup.controller("singleRoomForm", function($scope, $uibModalInstance, items) {
  $scope.selected = items;
  $scope.ok = function () {
         $uibModalInstance.close(items);
    };
    $scope.cancel = function () {
       $uibModalInstance.dismiss('cancel');
    };

});
