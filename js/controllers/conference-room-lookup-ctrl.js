'use strict'

ConferenceRoomLookup.controller("ConferenceRoom", function($scope, siteService, durationService, timeRangeService, responseGrid) {
    $scope.lookUpData = {};
    $scope.lookupRoom = {};
    $scope.siteOptions = [];
    $scope.buildingOptions = [];
    $scope.floorOptions = [];
    $scope.roomOptions = [];
    $scope.specificTime = false;
    $scope.timeFrom = timeRangeService.getFromTimeOptions();

    $scope.showA = false;

    $scope.searchResult = function() {
        // alert("hi");
        $scope.showA = true;
    };

    responseGrid.getResponseGridData().then(function(res) {
        $scope.gridData = res.data;
        angular.forEach($scope.gridData, function(room, m) {
            var temp = new Date("2016-07-25T00:00:00");
            var endDayTime = new Date("2016-07-25T24:00:00");
            console.log("temp", temp)
            room.slot = [];

            angular.forEach(room.busyslot, function(slot, n) {
                var sdt = new Date(slot.startDateTime);
                var edt = new Date(slot.endDateTime);
                var freeTime = sdt.getTime() - temp.getTime();
                freeTime = ((freeTime / 1000) / 60) / 15;
                console.log(freeTime);
                for (var i = 0; i < freeTime; i++) {
                    room.slot.push({
                        "type": "free"
                    });
                }
                var busyTime = edt.getTime() - sdt.getTime();
                busyTime = ((busyTime / 1000) / 60) / 15;
                console.log(busyTime);
                for (var i = 0; i < busyTime; i++) {
                    room.slot.push({
                        "type": "busy"
                    });
                }
                temp = edt;

                if (n == room.busyslot.length - 1 && edt.getTime() < endDayTime.getTime()) {
                    var freeTime = endDayTime.getTime() - temp.getTime();
                    console.log("EndDayTime: ", endDayTime.getTime(), temp.getTime())
                    freeTime = ((freeTime / 1000) / 60) / 15;
                    console.log(freeTime);
                    for (var i = 0; i < freeTime; i++) {
                        room.slot.push({
                            "startDateTime": sdt,
                            //                        "endDateTime": sdt+freeTime
                            "type": "free"
                        });
                    }

                }

            })
            console.log(room.slot)
        })

    });




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
            });
        }
    };


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

        if (timeRange == "AnyTime") {
            $scope.durationCount = (24 * 60) / 15;
        } else if (timeRange === "Morning") {
            $scope.durationCount = (3 * 60) / 15;
        } else if (timeRange === "Afternoon") {
            $scope.durationCount = (4 * 60) / 15;
        } else if (timeRange === "SpecificTime") {
            $scope.specificTime = true;
        }
    };

    $scope.changeSpecificFromTime = function(timeRange, fromTime) {
        $scope.timeTo = [];
        $scope.lookupRoom.toTime = null;
        if (timeRange === "SpecificTime") {

            $scope.timeTo = timeRangeService.getToTimeOptions($scope.timeFrom.indexOf(fromTime));
        }

    };

    $scope.changeSpecificToTime = function() {
        //TODO: Convert time into minutes and divide by 15
        //TODO: add the method in markup
        $scope.durationCount = (($scope.timeFrom.indexOf($scope.fromTime) - $scope.timeTo.indexOf($scope.toTime)) * 60) / 15;
    }


    //TODO: Not getting added to an object 
    $scope.date = new Date();
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
                    console.log(obj.size)

                    angular.forEach($scope.seats, function(seat) {
                        if (seat.size <= obj.size) {
                            seat.disable = 1;
                        } else {
                            seat.disable = 0;
                        }

                    });

                    console.log(obj.avcn, obj.projector, obj.appleTv);

                    $scope.amenities[0].disable = obj.avcn;
                    $scope.amenities[1].disable = obj.projector;
                    $scope.amenities[2].disable = obj.appleTv;
                }
            });
        }
    };









    $scope.PreviousDay = function() {
        alert("PreviousDay");
    }
    $scope.Previous4Hours = function() {
        alert("Previous4Hours");
    }
    $scope.Next4hours = function() {
        alert("Next4hours");
    }
    $scope.NextDay = function() {
        alert("NextDay");
    }


    $scope.gridOptions = {
        data: 'myData',
        enablePinning: false,
        columnDefs: [{
            field: "name",
            width: 120,
            pinned: true
        }, {
            field: "age",
            width: 120
        }, {
            field: "birthday",
            width: 120
        }, {
            field: "salary",
            width: 120
        }]
    };
    $scope.myData = [{
        name: "Moroni",
        age: 50,
        birthday: "Oct 28, 1970",
        salary: "60,000"
    }, {
        name: "Tiancum",
        age: 43,
        birthday: "Feb 12, 1985",
        salary: "70,000"
    }, {
        name: "Jacob",
        age: 27,
        birthday: "Aug 23, 1983",
        salary: "50,000"
    }, {
        name: "Nephi",
        age: 29,
        birthday: "May 31, 2010",
        salary: "40,000"
    }, {
        name: "Enos",
        age: 34,
        birthday: "Aug 3, 2008",
        salary: "30,000"
    }, {
        name: "Moroni",
        age: 50,
        birthday: "Oct 28, 1970",
        salary: "60,000"
    }, {
        name: "Tiancum",
        age: 43,
        birthday: "Feb 12, 1985",
        salary: "70,000"
    }, {
        name: "Jacob",
        age: 27,
        birthday: "Aug 23, 1983",
        salary: "40,000"
    }, {
        name: "Nephi",
        age: 29,
        birthday: "May 31, 2010",
        salary: "50,000"
    }, {
        name: "Enos",
        age: 34,
        birthday: "Aug 3, 2008",
        salary: "30,000"
    }, {
        name: "Moroni",
        age: 50,
        birthday: "Oct 28, 1970",
        salary: "60,000"
    }, {
        name: "Tiancum",
        age: 43,
        birthday: "Feb 12, 1985",
        salary: "70,000"
    }, {
        name: "Jacob",
        age: 27,
        birthday: "Aug 23, 1983",
        salary: "40,000"
    }, {
        name: "Nephi",
        age: 29,
        birthday: "May 31, 2010",
        salary: "50,000"
    }, {
        name: "Enos",
        age: 34,
        birthday: "Aug 3, 2008",
        salary: "30,000"
    }];




    $scope.resultTimeRange = ["9.00 AM", "10.00 AM", "11.00 AM", "12.00 AM"];
    $scope.resultRooms = ["Bomb Voyage [AVCN] (14) 2nd", "The Underminer [AVCN] (14) 2nd", "Omnidroid (4) 2nd", "Syndrome (14) 1st", "Nomanisan Island (10) 2nd", "Elastigirl (14) 1st"];

});