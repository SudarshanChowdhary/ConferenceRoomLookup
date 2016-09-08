'use strict'

ConferenceRoomLookup.controller("ConferenceRoom", function($scope, siteService, durationService, timeRangeService, responseGrid, $anchorScroll, $document, $timeout, $http) {
    $scope.lookUpData = {};
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
    // $scope.searchRooms={};

    $scope.showSearchResult = false;
    $scope.showSingleRoom = false;

    $scope.searchResult = function() {
        if ($scope.lookupRoomForm.$valid) {
            var smroom = $scope.lookupRoom;
            var from_time = "00:00:00";
            var to_time = "23:59:59";
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

            $scope.inputData = {}
            $scope.inputData.room = jsonrooms;
            $scope.inputData.timeRange = {
                "from": from_time,
                "to": to_time
            };
            $scope.inputData.timezone = smroom.timezone;
            $scope.inputData.unavailable = smroom.unavailable;
            var d = new Date(smroom.date);
            $scope.inputData.searchDate = d.getFullYear() + "-" + $scope.appendZero(d.getMonth() + 1) + "-" + $scope.appendZero(d.getDate());
            // alert("request object",$scope.lookupRoom);


            if (!$scope.lookupRoom.room) {
                $scope.showSearchResult = true;
                var jsonrooms = [];
                angular.forEach($scope.roomOptions, function(room) {
                    jsonrooms.push({
                        roomName: room.roomName,
                        roomUid: room.roomUid
                    });
                });

                $scope.searchMultipleRooms($scope.inputData);
                $scope.showSingleRoom = false;
                $scope.showSearchResult = true;
            } else {
                $scope.searchSingleRoom($scope.inputData);
                $scope.showSingleRoom = true;
                $scope.showSearchResult = false;
            }
        }
    };

    $scope.appendZero = function(inNumber) {
        return (inNumber <= 9) ? "0" + inNumber : inNumber;
    };

    $scope.createSlots = function(room) {
        if (room.busyslot.length != 0) {
            var dt = room.busyslot[0].startDateTime;
            dt = dt.split("T");
            var temp = new Date(dt[0] + "T00:00:00");
            var endDayTime = new Date(dt[0] + "T24:00:00");
            //console.log("temp", temp)
            room.slot = [];
            angular.forEach(room.busyslot, function(slot, n) {

                var sdt = new Date(slot.startDateTime);
                var edt = new Date(slot.endDateTime);

                var freeTime = sdt.getTime() - temp.getTime();
                freeTime = ((freeTime / 1000) / 60) / 15;
                //console.log(freeTime);
                for (var i = 0; i < freeTime; i++) {
                    room.slot.push({
                        "type": "free",
                        "highlight": false
                    });
                }
                var busyTime = edt.getTime() - sdt.getTime();
                busyTime = ((busyTime / 1000) / 60) / 15;
                //console.log(busyTime);
                for (var i = 0; i < busyTime; i++) {
                    room.slot.push({
                        "type": "busy",
                        "highlight": false
                    });
                }
                temp = edt;

                if (n == room.busyslot.length - 1 && edt.getTime() < endDayTime.getTime()) {
                    var freeTime = endDayTime.getTime() - temp.getTime();
                    //console.log("EndDayTime: ", endDayTime.getTime(), temp.getTime())
                    freeTime = ((freeTime / 1000) / 60) / 15;
                    //console.log(freeTime);
                    //        tempHours=tempHours.getTime()+(15 * 60 * 1000);
                    for (var i = 0; i < freeTime; i++) {
                        room.slot.push({
                            "type": "free",
                            "highlight": false
                        });
                    }
                }
            });

        } else {
            room.slot = [];
            for (var i = 0; i < 96; i++) {
                room.slot.push({
                    "type": "free",
                    "highlight": false
                });
            }
        }

        var tempHours = new Date("2016-07-25T00:00:00");
        $scope.hours = [];

        for (var i = 0; i < 96; i = i + 4) {
            $scope.hours.push(tempHours);
            tempHours = new Date(tempHours.getTime() + (60 * 60 * 1000));
        }
        $anchorScroll("searchRoomGrid");
        $scope.initScroll = 9;
        $timeout(function() {
            //                    $scope.initScrollDiv=$document.find("#"+$scope.initScroll).offset().left - 525;
            $scope.initScrollDiv = 900;
            console.log($scope.initScrollDiv)
            $scope.scrollToTime($scope.initScrollDiv);
        }, 10);
    };

    // for single room slot

    $scope.createSingleRoomSlots = function(room) {
        if (room.events.length != 0) {
            var dt = room.events[0].startDateTime;
            dt = dt.split("T");
            var temp = new Date(dt[0] + "T00:00:00");
            var endDayTime = new Date(dt[0] + "T24:00:00");
            console.log("temp", temp)
            room.slot = [];
            angular.forEach(room.events, function(events, n) {

                var sdt = new Date(events.startDateTime);
                var edt = new Date(events.endDateTime);
                console.log(sdt);
                console.log("sdt", sdt.getTime(), "temp", temp.getTime())
                var freeTime = sdt.getTime() - temp.getTime();
                freeTime = ((freeTime / 1000) / 60) / 15;
                console.log(freeTime);

                for (var i = 0; i < freeTime; i++) {
                    room.slot.push({
                        "type": "free",
                        "highlight": false
                    });
                }
                console.log("edt", edt.getTime(), "sdt", sdt.getTime())
                var busyTime = edt.getTime() - sdt.getTime();
                busyTime = ((busyTime / 1000) / 60) / 15;
                console.log(busyTime);
                debugger;
                for (var i = 0; i < busyTime; i++) {
                    room.slot.push({
                        "type": "busy",
                        "highlight": false
                    });
                }
                temp = edt;

                if (n == room.events.length - 1 && edt.getTime() < endDayTime.getTime()) {
                    var freeTime = endDayTime.getTime() - temp.getTime();
                    //console.log("EndDayTime: ", endDayTime.getTime(), temp.getTime())
                    freeTime = ((freeTime / 1000) / 60) / 15;
                    //console.log(freeTime);
                    //        tempHours=tempHours.getTime()+(15 * 60 * 1000);
                    for (var i = 0; i < freeTime; i++) {
                        room.slot.push({
                            "type": "free",
                            "highlight": false
                        });
                    }
                }
            });

        } else {
            room.slot = [];
            for (var i = 0; i < 96; i++) {
                room.slot.push({
                    "type": "free",
                    "highlight": false
                });
            }
        }
console.log(room)
        var tempHours = new Date("2016-07-25T00:00:00");
        $scope.hours = [];

        for (var i = 0; i < 96; i = i + 4) {
            $scope.hours.push(tempHours);
            tempHours = new Date(tempHours.getTime() + (60 * 60 * 1000));
        }
        $anchorScroll("searchRoomGrid");
        $scope.initScroll = 9;
        $timeout(function() {
            //                    $scope.initScrollDiv=$document.find("#"+$scope.initScroll).offset().left - 525;
            $scope.initScrollDiv = 900;
            console.log($scope.initScrollDiv)
            $scope.scrollToTime($scope.initScrollDiv);
        }, 10);
    };


    $scope.searchMultipleRooms = function(searchFormData) {
        $scope.loader = true;
        $http({
            // url:"http:ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/tool/get_rooms_search/?format=jsonrooms"
            url: "js/services/responseGrid-data.json",
            method: "GET",
            data: "searchFormData"
        }).then(function(res) {
            $scope.loader = false;
            $scope.grid_data = res.data.data;
            angular.forEach($scope.grid_data, function(room, m) {
                $scope.createSlots(room);
            });
        });
    }

    $scope.searchSingleRoom = function(searchFormData) {
        $scope.loader = true;
        $http({
            url: "js/services/singleRoom-data.json",
            method: "GET",
            data: "searchFormData"
        }).then(function(res) {
            $scope.loader = false;
            $scope.singleRoomData = res.data.data;
            console.log($scope.singleRoomData);
            $scope.createSingleRoomSlots($scope.singleRoomData);
        });
    }

    $scope.scrollToTime = function(initScrollDiv) {
        var el = $document.find("#searchRoomGrid .table-responsive")
        console.log(initScrollDiv);
        el.scrollLeft(initScrollDiv)
            //             el.animate({ scrollLeft:initScrollDiv}, 1, function() { });
    }

    // popover code
    $scope.dynamicPopover = {
        templateUrl: 'myPopoverTemplate.html',
        outsideClick: "outsideClick",
    };

    // popover code end
    $scope.addDurationClass = function(obj, index) {
        $scope.startIndex = index;
        $scope.durationFlag = true;
        for (var i = index; i < index + $scope.durationTime.indexOf($scope.lookupRoom.duration) + 1; i++) {
            if (obj.slot[i].type != 'free') {
                $scope.startIndex--;
                if (obj.slot[$scope.startIndex].type != 'free') {
                    $scope.durationFlag = false;
                }
            }
        }
        if ($scope.durationFlag) {
            for (var i = $scope.startIndex; i < $scope.startIndex + $scope.durationTime.indexOf($scope.lookupRoom.duration) + 1; i++) {
                obj.slot[i].highlight = true;
            }
        }
    }

    $scope.removeDurationClass = function(obj, index) {
        for (var i = $scope.startIndex; i < $scope.startIndex + $scope.durationTime.indexOf($scope.lookupRoom.duration) + 1; i++) {
            obj.slot[i].highlight = false;
        }
    };

    $scope.PreviousDay = function() {
        var PrevDay = new Date($scope.inputData.searchDate);
        PrevDay.setDate(PrevDay.getDate() - 1)
        $scope.inputData.searchDate = PrevDay;
        // $scope.searchRooms($scope.inputData);
        console.log($scope.inputData.searchDate);
    };

    $scope.Previous4Hours = function() {
        if ($scope.initScroll > 3) {
            $scope.initScroll -= 4;
            $scope.initScrollDiv -= 400;
            $scope.scrollToTime($scope.initScrollDiv);
            console.log($scope.initScrollDiv)
        }
    };

    $scope.Next4hours = function() {
        if ($scope.initScroll < 19) {
            $scope.initScroll += 4;
            $scope.initScrollDiv += 400;
            $scope.scrollToTime($scope.initScrollDiv);
            console.log($scope.initScrollDiv)
        }
    };

    $scope.NextDay = function() {
        var NextDay = new Date($scope.inputData.searchDate);
        NextDay.setDate(NextDay.getDate() + 1)
        $scope.inputData.searchDate = NextDay;
        // $scope.searchRooms($scope.inputData);
        console.log($scope.inputData.searchDate);
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
            angular.forEach($scope.lookUpData, function(obj, index) {
                if (obj.campusName === campus && $scope.buildingOptions.indexOf(obj.buildingName) === -1) {
                    $scope.buildingOptions.push(obj.buildingName);
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

                // Loading Floors
                if (obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === buildingName && $scope.floorOptions.indexOf(obj.floorNumber) === -1) {
                    $scope.floorOptions.push(obj.floorNumber);
                }
                // Loading Rooms
                var room = {
                    "roomName": obj.roomName,
                    "roomUid": obj.roomUid
                }
                if (obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === buildingName && $scope.roomOptions.indexOf(JSON.stringify(room)) === -1) {
                    $scope.roomOptions.push(room);
                }

                //Getting Timezone for selected building
                if (obj.buildingName == buildingName) {
                    $scope.lookupRoom.timezone = obj.timezone;
                }
            });
        }
    };

    $scope.searchRoomGridnearby = false;
    $scope.nearbybuildings = false;
    $scope.nearbyBuilding = function() {
        if ($scope.searchRoomGridnearby) {
            $scope.searchRoomGridnearby = true;
            $scope.nearbybuildings = false;
        } else {
            $scope.nearbybuildings = true;
            $scope.searchRoomGridnearby = false;
        }

    }

    $scope.changeFloor = function(floorNumber) {
        $scope.roomOptions = [];
        $scope.disableRoom = true;
        if (!floorNumber) {
            $scope.lookupRoom.roomName = null;
            angular.forEach($scope.lookUpData, function(obj) {
                // Loading Rooms
                var room = {
                    "roomName": obj.roomName,
                    "roomUid": obj.roomUid
                };
                if (obj.campusName === $scope.lookupRoom.campusName && obj.buildingName === $scope.lookupRoom.buildingName) {
                    $scope.roomOptions.push(room);
                }
            });
        } else {
            // Put all conditions for avoid duplicates
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

        //TODO: Convert time into minutes and divide by 15

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
        //TODO: Convert time into minutes and divide by 15
        //TODO: add the method in markup
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
        //        minDate: date(),
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
                    //console.log(obj.size)

                    angular.forEach($scope.seats, function(seat) {
                        if (seat.size <= obj.size) {
                            seat.disable = 1;
                        } else {
                            seat.disable = 0;
                        }

                    });

                    //console.log(obj.avcn, obj.projector, obj.appleTv);

                    $scope.amenities[0].disable = obj.avcn;
                    $scope.amenities[1].disable = obj.projector;
                    $scope.amenities[2].disable = obj.appleTv;
                }
            });
        }
    };

});
