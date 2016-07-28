'use strict'

ConferenceRoomLookup.controller("ConferenceRoom", function($scope, siteService, durationService, timeRangeService) {
    $scope.lookUpData = {};
    $scope.lookupRoom={};
    $scope.siteOptions = [];
    $scope.buildingOptions = [];
    $scope.floorOptions=[];
    $scope.roomOptions=[];



    $scope.showA = false;
    $scope.searchResult = function() {
       // alert("hi");
        $scope.showA = true;
    };

    var uniqueData = function(dataObj, field) {
       // debugger;
        var unique = [];
        angular.forEach(dataObj, function(obj) {
            var index = unique.indexOf(obj[field]);
            if (index === -1) {
                unique.push(obj[field]);
            }
        });
        return unique;
    };

    siteService.getSiteData().then(function(response) {
        $scope.lookUpData = response.data;
        var uniqueRegionId = [];
        angular.forEach($scope.lookUpData, function(obj, index) {
            var index = uniqueRegionId.indexOf(obj.regionId);
            if (index === -1) {
                uniqueRegionId.push(obj.regionId);
                $scope.siteOptions.push({
                    regionId: obj.regionId,
                    regionName: obj.regionName,
                    campus: []
                });
            }
        });

        var uniqueRegions = uniqueData($scope.lookUpData, "regionId");
        var uniqueCampus = uniqueData($scope.lookUpData, "campusName");

        for (var i = 0; i < uniqueRegions.length; i++) {
            for (var j = 0; j < uniqueCampus.length; j++) {
                for (var k = 0; k < $scope.lookUpData.length; k++) {
                    if ($scope.lookUpData[k].regionId === uniqueRegions[i] && $scope.lookUpData[k].campusName === uniqueCampus[j]
                        && $scope.siteOptions[i].campus.indexOf($scope.lookUpData[k].campusName) === -1) {
                        $scope.siteOptions[i].campus.push($scope.lookUpData[k].campusName);
                    }
                }
            }
        }
    });

    $scope.durationTime = durationService.getDuration();
    $scope.timeFrom = timeRangeService.getFromTimeOptions();
    $scope.timeTo = timeRangeService.getToTimeOptions();

    $scope.loadBuilding = function(campus) {
        $scope.buildingOptions = [];
	    $scope.floorOptions=[];
   		$scope.roomOptions=[];

        if (!campus) {
            $scope.lookupRoom.buildingName ="";
            $scope.lookupRoom.floorNumber = "";
            $scope.lookupRoom.roomName = "";

            $scope.disableBuilding = false;
            $scope.disableFloor = false;     
            $scope.disableRoom = false;

        } else {
            $scope.disableBuilding = true;
            angular.forEach($scope.lookUpData, function(obj, index) {
                if (obj.campusName === campus && $scope.buildingOptions.indexOf(obj.buildingName) === -1) {
                    $scope.buildingOptions.push(obj.buildingName);
                }
            })
        }
    };

    $scope.loadFloorsAndRooms = function(buildingName) {
        $scope.floorOptions = [];
        $scope.roomOptions =[];
        if (!buildingName) {

            $scope.lookupRoom.floorNumber = "";
            $scope.lookupRoom.roomName = "";

            $scope.disableFloor = false;
            $scope.disableRoom = false;
        } else {
            $scope.disableFloor= true;
            $scope.disableRoom = true;
            angular.forEach($scope.lookUpData, function(obj) {

                // Loading Floors
                if(obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === buildingName && $scope.floorOptions.indexOf(obj.floorNumber)===-1){
                    $scope.floorOptions.push(obj.floorNumber);
                }
                // Loading Rooms
                var room={"roomUid":obj.roomUid, "roomName":obj.roomName};
                if(obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === buildingName && $scope.roomOptions.indexOf(JSON.stringify(room))===-1){
                    $scope.roomOptions.push(room);
                }
            });
        }
    };


    $scope.changeFloor = function(floorNumber) {
        $scope.roomOptions = [];
        $scope.disableRoom = true;
        if (!floorNumber) {
            $scope.lookupRoom.roomName = "";
            angular.forEach($scope.lookUpData, function(obj) {
                // Loading Rooms
                var room={"roomUid":obj.roomUid, "roomName":obj.roomName};
                if(obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === $scope.lookupRoom.buildingName && $scope.roomOptions.indexOf(JSON.stringify(room))===-1){
                    $scope.roomOptions.push(room);
                }
            });
        } else {
        	// Put all conditions for avoid duplicates 
            angular.forEach($scope.lookUpData, function(obj) {
                var room={"roomUid":obj.roomUid, "roomName":obj.roomName};
                if(obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === $scope.lookupRoom.buildingName && obj.floorNumber==floorNumber && $scope.roomOptions.indexOf(JSON.stringify(room))===-1){
                    $scope.roomOptions.push(room);
                }
            });
        }
    };

    $scope.availableSeatsAndAmenities = function (room){
		if (!room) {



        } else {

        	alert("hi")
            angular.forEach($scope.lookUpData, function(obj) {
                if(obj.roomUid===room.roomUid){
                    $scope.room.seats =obj.size;
					$scope.room.amenities={"avcn": obj.avcn, "projector": obj.projector, "appleTv":obj.appleTv};
                }
            });
        }
    };

    $scope.dt = new Date();

    $scope.popup2 = {
        opened: false
    };
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    $scope.dateOptions = {
        startingDay: 1,
        minDate: new Date("1/07/2016"),
        showWeeks: false
    };



$scope.resultTimeRange=["9.00 AM", "10.00 AM", "11.00 AM", "12.00 AM"];
$scope.resultRooms=["Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd", "Bomb Voyage [AVCN] (14) 2nd"];



});