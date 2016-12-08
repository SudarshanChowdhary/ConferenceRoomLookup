ConferenceRoomLookup.directive("multiRoomGrid", function(responseGrid, $anchorScroll, $filter, $document, $timeout, $http) {
    return {
        restrict: "E",
        templateUrl: "views/multiRoomGrid.html",
        $scope: {
            multiroom_data: "@"
        },
        link: function($scope, $ele, $attr) {
            $scope.bookSlot = {
                templateUrl: 'bookSlot.html'
            };
            $scope.createSlots = function(room) {
                if (room.busyslot.length != 0) {
                    var dt = room.busyslot[0].startDateTime;
                    dt = dt.split("T");

                    var temp = new Date(dt[0] + "T00:00:00");
                    var endDayTime = new Date(dt[0] + "T23:59:00");
                    room.slot = [];
                    angular.forEach(room.busyslot, function(slot, n) {

                        /* ignoring the time zone */
                        var sdt = new Date(slot.startDateTime.split(".")[0]);
                        var edt = new Date(slot.endDateTime.split(".")[0]);

                        var freeTime = sdt.getTime() - temp.getTime();
                        freeTime = ((freeTime / 1000) / 60) / 15;
                        freeTime = freeTime.toFixed();

                        var tempTime = temp;
                        for (var i = 0; i < freeTime; i++) {
                            room.slot.push({
                                "time": tempTime,
                                "type": "free",
                                "highlight": false,
                                "startDurationTime": null,
                                "endDurationTime": null
                            });
                        tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
                        }
                        var busyTime = edt.getTime() - sdt.getTime();
                        busyTime = ((busyTime / 1000) / 60) / 15;
                        busyTime = busyTime.toFixed();
                        for (var i = 0; i < busyTime; i++) {
                            room.slot.push({
                                "time": tempTime,
                                "type": "busy",
                                "highlight": false,
                                "startDurationTime": null,
                                "endDurationTime": null
                            });
                            tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
                        }

                        temp = edt;
                        if (n == room.busyslot.length - 1 && edt.getTime() < endDayTime.getTime()) {
                            var freeTime = endDayTime.getTime() - edt.getTime();
                            freeTime = ((freeTime / 1000) / 60) / 15;
                            freeTime = freeTime.toFixed();
                            for (var i = 0; i < freeTime; i++) {
                                room.slot.push({
                                    "time": tempTime,
                                    "type": "free",
                                    "highlight": false,
                                    "startDurationTime": null,
                                    "endDurationTime": null
                                });
                            tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
                            }
                        }
                    });

                } else {
                    room.slot = [];
                    var tempTime = new Date($scope.inputData.searchDate+"T00:00:00");
                    for (var i = 0; i < 96; i++) {
                        room.slot.push({
                            "time": tempTime,
                            "type": "free",
                            "highlight": false,
                            "startDurationTime": null,
                            "endDurationTime": null
                        });
                        tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
                    }
                }
            };



            $timeout(function() {
                angular.forEach($scope.multiroom_data, function(room, m) {
                    $scope.createSlots(room);
                });
            }, 10);

            $timeout(function() {
                $anchorScroll("multiRoom");
                $scope.initScrollDiv = 900;
                $scope.scrollToTime($scope.initScrollDiv);
            }, 10);

            $scope.scrollToTime = function(initScrollDiv) {
                var el = $document.find("#searchRoomGrid .table-responsive");
                el.scrollLeft(initScrollDiv);
                el.bind("scroll", function() {
                    $scope.initScrollDiv = el.scrollLeft();
                })
            }

            $scope.creatEvent = function(index){
              $scope.eventLoader = true;
              // console.log(roomName, roomUid, startDurationTime, endDurationTime, timezone)
             var req={
                "attendeeUid":"FF5CE544-D5B2-9FBB-5C78-7A392E26B701",
                "attendeeName": "sudarshan",
                "attendeeEmail":"sudarshan_koyalkar@apple.com",
                "roomName":$scope.inputData.room.roomName,
                "roomUid":$scope.inputData.room.roomUid,
                "startTime": $filter('date')($scope.multiroom_data.slot[index].startDurationTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC'),
                "endTime":$filter('date')($scope.multiroom_data.slot[index].endDurationTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC'),
                "timeZone":$scope.inputData.timezone
              };

              console.log(req);
              responseGrid.bookRoom(req).then(function(res) {
                responseGrid.getMultipleRoomsData($scope.reqDataMulti).then(function(res) {
                    $scope.multiroom_data = res.data.data;
                        angular.forEach($scope.multiroom_data, function(room, m) {
                            $scope.createSlots(room);
                        });
                    $scope.eventLoader = false;

                    $timeout(function() {
                        $scope.scrollToTime($scope.initScrollDiv);
                    }, 10);

                })
              })

            }

            $scope.addDurationClass = function(obj, index) {
                var startIndex = index;
                $scope.durationFlag = true;
                if($scope.inputData.durationIndex){
                  $scope.inputData.durationIndex=0;
                }
                for (var i = index; i < index + $scope.inputData.durationIndex + 1; i++) {
                    if (obj.slot[i].type != 'free') {
                        startIndex --;
                        if (obj.slot[startIndex].type != 'free') {
                            $scope.durationFlag = false;
                        }
                    }
                }
                if ($scope.durationFlag && startIndex <= index) {
                    for (var i = startIndex; i < startIndex + $scope.inputData.durationIndex + 1; i++) {
                        obj.slot[i].highlight = true;
                        obj.slot[i].startDurationTime = obj.slot[i].time;
                        obj.slot[i].endDurationTime = obj.slot[i+$scope.inputData.durationIndex + 1].time;
                    }
                }else if(!$scope.durationFlag){
                      obj.slot[index].highlight = true;
                      obj.slot[index].startDurationTime = obj.slot[index].time;
                      obj.slot[index].endDurationTime = obj.slot[index + 1].time;
                }
            }

            $scope.appendZero = function(inNumber) {
                return (inNumber <= 9) ? "0" + inNumber : inNumber;
            };

            $scope.removeDurationClass = function(obj, index) {
                for (var i = 0; i < 96; i++) {
                    obj.slot[i].highlight = false;
                }
            };
            $scope.PreviousDay = function() {
                $scope.inputData.loader = true;
                var PrevDay = new Date();
                PrevDay.setDate($scope.inputData.d.getDate() - 1)
                $scope.inputData.d = PrevDay;
                $scope.inputData.searchDate = PrevDay.getFullYear() + "" + $scope.appendZero(PrevDay.getMonth() + 1) + "" + $scope.appendZero(PrevDay.getDate());
                $scope.reqDataMulti = {
                    "room": $scope.inputData.room,
                    "searchDate": $scope.inputData.searchDate,
                    "timeRange": $scope.inputData.timeRange,
                    "timezone": $scope.inputData.timezone,
                    "unavailable": $scope.inputData.unavailable
                }
                responseGrid.getMultipleRoomsData($scope.reqDataMulti).then(function(res) {
                    $scope.multiroom_data = res.data.data;
                    angular.forEach($scope.multiroom_data, function(room, m) {
                        $scope.createSlots(room);
                    });
                    $scope.inputData.loader = false;
                })
            };

            $scope.Previous4Hours = function() {
                if ($scope.initScrollDiv > 0) {
                    $scope.initScrollDiv -= 400;
                    $scope.scrollToTime($scope.initScrollDiv);
                }
            };

            $scope.Next4hours = function() {
                if ($scope.initScrollDiv < 1900) {
                    $scope.initScrollDiv += 400;
                    $scope.scrollToTime($scope.initScrollDiv);
                }
            };

            $scope.NextDay = function() {
                $scope.inputData.loader = true;
                var NextDay = new Date();
                NextDay.setDate($scope.inputData.d.getDate() + 1)
                $scope.inputData.searchDate = NextDay;
                $scope.inputData.searchDate = NextDay.getFullYear() + "" + $scope.appendZero(NextDay.getMonth() + 1) + "" + $scope.appendZero(NextDay.getDate());
                $scope.reqDataMulti = {
                    "room": $scope.inputData.room,
                    "searchDate": $scope.inputData.searchDate,
                    "timeRange": $scope.inputData.timeRange,
                    "timezone": $scope.inputData.timezone,
                    "unavailable": $scope.inputData.unavailable
                }
                responseGrid.getMultipleRoomsData($scope.reqDataMulti).then(function(res) {
                    $scope.multiroom_data = res.data.data;
                    angular.forEach($scope.multiroom_data, function(room, m) {
                        $scope.createSlots(room);
                    });
                    $scope.inputData.loader = false;
                })
            };
        }
    }
});
