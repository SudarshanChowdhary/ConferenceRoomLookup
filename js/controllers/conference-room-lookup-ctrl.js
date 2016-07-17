'use strict'

ConferenceRoomLookup.controller("ConferenceRoom", function($scope, siteService, buildingService, floorService, roomService){
	$scope.enableFloor= true;
	$scope.siteOptions= siteService.get();

	
	$scope.buildingOptions= buildingService.get();
	$scope.floorOptions= floorService.get();
	$scope.roomOptions= roomService.get();

})