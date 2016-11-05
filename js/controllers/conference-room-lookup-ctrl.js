'use strict'

ConferenceRoomLookup.controller("ConferenceRoom", function($scope, siteService, responseGrid, durationService, timeRangeService, $compile) {
    /* , $uibModalInstance, items */
    $scope.lookUpData = {};
    $scope.nearby_data=[{},{},{},{}];
    $scope.siteOptions = [];
    $scope.buildingOptions = [];
    $scope.floorOptions = [];
    $scope.roomOptions = [];
    $scope.specificTime = false;
    $scope.timeFrom = timeRangeService.getFromTimeOptions();
    $scope.timeTo = timeRangeService.getToTimeOptions();
    $scope.lookupRoom = {
        "date": new Date(),
        "unavailable": 0
    };
    $scope.inputData={ showMultiRoom: false, showSingleRoom: false, showNearByRoom:[false, false, false, false], loader:false, clickNumber:0};

    $scope.$watch('lookupRoomForm.$dirty', function(v) {
        if (!v) {
            return
        }
        $scope.inputData = {};
        $scope.multpliroom_data ={};
        $scope.nearby_data=[{}, {}, {}, {}];
        $scope.singleroom_data={};
        angular.element("#singleRoom").html("");
        $scope.inputData.showMultiRoom=false;
        $scope.inputData.showSingleRoom=false;
        $scope.inputData.showNearByRoom=[false, false, false, false];
        $scope.inputData.loader=false;
        $scope.inputData.clickNumber=0;
//        $scope.inputData={showMultiRoom:false, showSingleRoom:false, showNearByRoom:[false, false, false, false], loader:false, clickNumber:0};
        $scope.lookupRoomForm.$setPristine();

    })

    $scope.searchResult = function() {

        $scope.inputData = {}
        $scope.inputData.showMultiRoom = false;
        $scope.inputData.showSingleRoom = false;
        $scope.inputData.showNearByRoom = [false, false, false, false];
        $scope.inputData.loader = true;

        if ($scope.lookupRoomForm.$valid) {
            var smroom = $scope.lookupRoom;
            var from_time = "00:00:00";
            var to_time = "23:59:00";
            switch (smroom.timeRange) {
                case "1":
                    from_time = "09:00:00";
                    to_time = "12:00:00";
                    break;
                case "2":
                    from_time = "13:00:00";
                    to_time = "17:00:00";
                    break;
                case "3":
                    from_time = smroom.fromTime.value;
                    to_time = smroom.toTime;
                    break;
                default:
                    break;
            }

            $scope.inputData.buildingName = $scope.lookupRoom.buildingName;
            $scope.inputData.timeRange = {
                "from": from_time,
                "to": to_time
            };
            $scope.inputData.floorNumber = $scope.lookupRoom.floorNumber;
            $scope.inputData.amenities = [];
            $scope.inputData.seats = [];

            for (var key in $scope.lookupRoom.amenities) {
                if ($scope.lookupRoom.amenities[key]) {
                    $scope.inputData.amenities.push(key);
                }
            }

            for (var key in $scope.lookupRoom.seats) {
                if ($scope.lookupRoom.seats[key]) {
                    $scope.inputData.seats.push(key);
                }
            }

            $scope.inputData.duration = $scope.lookupRoom.duration;
            $scope.inputData.durationIndex = $scope.durationTime.indexOf($scope.lookupRoom.duration);
            $scope.inputData.timezone = smroom.timezone;
            $scope.inputData.unavailable = smroom.unavailable;
            $scope.inputData.d = new Date(smroom.date);
            $scope.inputData.searchDate = $scope.inputData.d.getFullYear() + "" + $scope.appendZero($scope.inputData.d.getMonth() + 1) + "" + $scope.appendZero($scope.inputData.d.getDate());

            if (!$scope.lookupRoom.room) {
                var jsonrooms = [];
                angular.forEach($scope.roomOptions, function(room) {
                    jsonrooms.push({
                        roomName: room.roomName,
                        roomUid: room.roomUid
                    });
                });
                $scope.inputData.room = jsonrooms;
                $scope.inputData.latitude = $scope.geo[$scope.buildingOptions.indexOf($scope.lookupRoom.buildingName)].latitude;
                $scope.inputData.longitude = $scope.geo[$scope.buildingOptions.indexOf($scope.lookupRoom.buildingName)].longitude;
                $scope.inputData.buildingCode = $scope.geo[$scope.buildingOptions.indexOf($scope.lookupRoom.buildingName)].buildingCode;
                $scope.inputData.showSingleRoom = false;
                $scope.inputData.clickNumber = 1;

                var reqData = {
                    "room": $scope.inputData.room,
                    "searchDate": $scope.inputData.searchDate,
                    "timeRange": $scope.inputData.timeRange,
                    "timezone": $scope.inputData.timezone,
                    "unavailable": $scope.inputData.unavailable
                }

                responseGrid.getMultipleRoomsData(reqData).then(function(res){
                  $scope.multiroom_data = res.data.data;
                  $scope.inputData.showMultiRoom = true;
                  $scope.inputData.loader = false;
                })
            } else {
                $scope.inputData.room ={
                  "roomName": $scope.lookupRoom.room.roomName,
                  "roomUid": $scope.lookupRoom.room.roomUid,
                };
                $scope.inputData.showSingleRoom = true;
                $scope.inputData.showMultiRoom = false;
                $scope.inputData.showNearByRoom=[false, false, false];

                var reqData = {
                  "roomName": $scope.inputData.room.roomName,
                  "roomUid": $scope.inputData.room.roomUid,
                  "searchDate": $scope.inputData.searchDate,
                  "timeRange": $scope.inputData.timeRange,
                  "timezone": $scope.inputData.timezone,
                  "unavailable": $scope.inputData.unavailable
              };

              responseGrid.getSingleRoomData(reqData).then(function(res){
                console.log(res);
                  $scope.singleroom_data = res.data.data;
                  angular.element("#singleRoom").html("");
                  angular.element("#singleRoom").append($compile("<single-room-grid></single-room-grid")($scope));
                  $scope.inputData.loader = false;
              });
            }
        }
    };

    $scope.nearbyBuilding = function() {
        $scope.inputData.loader = true;
        var reqData = {
            "searchDate": $scope.inputData.searchDate,
            "timeRange": $scope.inputData.timeRange,
            "timezone": $scope.inputData.timezone,
            "unavailable": $scope.inputData.unavailable,
            "latitude": $scope.inputData.latitude,
            "longitude": $scope.inputData.longitude,
            "clickNumber": $scope.inputData.clickNumber,
            "buildingCode": $scope.inputData.buildingCode
        }
        responseGrid.getNearByRoomData(reqData).then(function(res){
            $scope.inputData.showNearByRoom[$scope.inputData.clickNumber]=true;
            $scope.nearby_data[$scope.inputData.clickNumber] = res.data.data;
              console.log($scope.nearby_data[$scope.inputData.clickNumber]);
            // angular.element("#nearbyBuilding"+$scope.inputData.clickNumber).append($compile("<nearby-room-grid nearbydata='{{nearby_data[inputData.clickNumber]}}'></nearby-room-grid>")($scope));
            $scope.inputData.loader = false;
            $scope.inputData.clickNumber++;
        });
    }

    $scope.appendZero = function(inNumber) {
        return (inNumber <= 9) ? "0" + inNumber : inNumber;
    };

    $scope.dynamicPopover = {
        templateUrl: 'myPopoverTemplate.html',
        outsideClick: "outsideClick",
    };

    $scope.dynamicPopover1 = {
        templateUrl: 'myModalContent.html',
        outsideClick: "outsideClick",
    };

    var uniqueData = function(dataObj, field) {
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
                    if ($scope.lookUpData[k].regionId === uniqueRegions[i] && $scope.lookUpData[k].campusName === uniqueCampus[j] && $scope.siteOptions[i].campus.indexOf($scope.lookUpData[k].campusName) === -1) {
                        $scope.siteOptions[i].campus.push($scope.lookUpData[k].campusName);
                    }
                }
            }
        }
    });

    $scope.durationTime = durationService.getDuration();

    $scope.loadBuilding = function(campus) {
        $scope.buildingOptions = [];
        if (!campus) {
            $scope.lookupRoom.buildingName = "";
            $scope.lookupRoom.floorNumber = "";
            $scope.lookupRoom.roomName = "";

            $scope.disableBuilding = false;
            $scope.disableFloor = false;
            $scope.disableRoom = false;
        } else {
            $scope.disableBuilding = true;
            $scope.geo = [];
            angular.forEach($scope.lookUpData, function(obj, index) {
                if (obj.campusName === campus && $scope.buildingOptions.indexOf(obj.buildingName) === -1) {
                    $scope.buildingOptions.push(obj.buildingName);
                    $scope.geo.push({
                        "buildingCode": obj.buildingCode,
                        "latitude": obj.latitude,
                        "longitude": obj.longitude
                    });
                }
            })
        }
    };

    $scope.loadFloorsAndRooms = function(buildingName) {

        $scope.floorOptions = [];
        $scope.roomOptions = [];
        if (!buildingName) {

            $scope.lookupRoom.floorNumber = "";
            $scope.lookupRoom.roomName = "";

            $scope.disableFloor = false;
            $scope.disableRoom = false;
        } else {
            $scope.disableFloor = true;
            $scope.disableRoom = true;
            $scope.lookupRoom.timezone = "";

            angular.forEach($scope.lookUpData, function(obj) {

                /* Loading Floors */
                if (obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === buildingName && $scope.floorOptions.indexOf(obj.floorNumber) === -1) {
                    $scope.floorOptions.push(obj.floorNumber);
                }
                /* Loading Rooms */


                var room = {
                    "roomName": obj.roomName,
                    "roomUid": obj.roomUid
                }
                if (obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === buildingName && $scope.roomOptions.indexOf(JSON.stringify(room)) === -1) {
                    $scope.roomOptions.push(room);
                }

                /* Getting Timezone for selected building */
                if (obj.buildingName == buildingName) {
                    $scope.lookupRoom.timezone = obj.timeZone;
                }
            });
        }
    };


    $scope.changeFloor = function(floorNumber) {
        $scope.roomOptions = [];
        $scope.disableRoom = true;
        if (!floorNumber) {
            $scope.lookupRoom.roomName = null;
            angular.forEach($scope.lookUpData, function(obj) {
                /* Loading Rooms */
                var room = {
                    "roomName": obj.roomName,
                    "roomUid": obj.roomUid
                };
                if (obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === $scope.lookupRoom.buildingName) {
                    $scope.roomOptions.push(room);
                }
            });
        } else {
            /* Put all conditions for avoid duplicates */
            angular.forEach($scope.lookUpData, function(obj) {
                var room = {
                    "roomName": obj.roomName,
                    "roomUid": obj.roomUid
                };
                if (obj.floorNumber == floorNumber && obj.buildingName === $scope.lookupRoom.buildingName) {
                    $scope.roomOptions.push(room);
                }
            });
        }
    };

    $scope.changeTimeRange = function(timeRange) {
        $scope.specificTime = false;

        if (timeRange == "0") {
            $scope.durationCount = (24 * 60) / 15;
        } else if (timeRange === "1") {
            $scope.durationCount = (3 * 60) / 15;
        } else if (timeRange === "2") {
            $scope.durationCount = (4 * 60) / 15;
        } else if (timeRange === "3") {
            $scope.specificTime = true;
        }
    };
    $scope.changeSpecificFromTime = function(timeRange, fromTime) {
        $scope.timeTo = [];
        $scope.lookupRoom.toTime = null;
        if (timeRange === "3") {
            $scope.timeTo = timeRangeService.getToTimeOptions($scope.timeFrom.indexOf(fromTime));
        }

    };

    $scope.changeSpecificToTime = function() {
        /* TODO: Convert time into minutes and divide by 15
        TODO: add the method in markup */
        $scope.durationCount = (($scope.timeFrom.indexOf($scope.fromTime) - $scope.timeTo.indexOf($scope.toTime)) * 60) / 15;
    }

    $scope.popup2 = {
        opened: false
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.dateOptions = {
        startingDay: 1,
        /*       minDate: date(), */
        showWeeks: false
    };


    $scope.seats = [{
        "disable": 1,
        "size": 4,
        "checked": 0,
        "label": "2-4"
    }, {
        "disable": 1,
        "size": 8,
        "checked": 0,
        "label": "5-8"
    }, {
        "disable": 1,
        "size": 12,
        "checked": 0,
        "label": "9-12"
    }, {
        "disable": 1,
        "size": 20,
        "checked": 0,
        "label": "13-20"
    }, {
        "disable": 1,
        "size": 21,
        "checked": 0,
        "label": "20+"
    }];

    $scope.amenities = [{
        "disable": 1,
        "checked": 0,
        "label": "avcn"
    }, {
        "disable": 1,
        "checked": 0,
        "label": "projector"
    }, {
        "disable": 1,
        "checked": 0,
        "label": "appleTv"
    }]

    // $scope.headerHours = function () {
    //     $scope.tempHours = new Date("2016-07-25T00:00:00");
    //     hours = [];
    //     for (var i = 0; i < 96; i = i + 4) {
    //         tempHours = new Date(tempHours.getTime() + (60 * 60 * 1000));
    //         hours.push(tempHours);
    //     }
    //     return hours;
    // }

    $scope.MultiRoomHours = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];

    $scope.availableSeatsAndAmenities = function(room) {
        if (!room) {
            $scope.seats[0].disable = 1;
            $scope.seats[1].disable = 1;
            $scope.seats[2].disable = 1;
            $scope.seats[3].disable = 1;
            $scope.seats[4].disable = 1;

            $scope.amenities[0].disable = 1;
            $scope.amenities[1].disable = 1;
            $scope.amenities[2].disable = 1;

        } else {
            angular.forEach($scope.lookUpData, function(obj) {
                if (obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === $scope.lookupRoom.buildingName && obj.roomUid == room.roomUid) {
                    angular.forEach($scope.seats, function(seat) {
                        if (seat.size <= obj.size) {
                            seat.disable = 1;
                        } else {
                            seat.disable = 0;
                        }

                    });

                    $scope.amenities[0].disable = obj.avcn;
                    $scope.amenities[1].disable = obj.projector;
                    $scope.amenities[2].disable = obj.appleTv;
                }
            });
        }
    };

});
