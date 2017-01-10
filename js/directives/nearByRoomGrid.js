ConferenceRoomLookup.directive("nearbyRoomGrid", function($anchorScroll, responseGrid, $document, $timeout, $filter) {
    return {
        restrict: "E",
        templateUrl: "views/nearByRoomGrid.html",
        link: function($scope, $ele, $attr) {
            $scope.scrollToTime = function(initScrollDiv, index) {
                var el = $document.find("#nearbyTbl_" + index + " .table-responsive");
                el.scrollLeft(initScrollDiv);
            }

            $scope.bookSlot = {
                templateUrl: 'nearByBookSlot.html'
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
                                "selected": false,
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
                                "selected": false,
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
                                "selected": false,
                                "startDurationTime": null,
                                "endDurationTime": null
                                });
                                tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
                            }
                        }
                    });

                } else {
                    room.slot = [];
                    var tempTime = $scope.inputData.d.getFullYear() + "-" + ($scope.inputData.d.getMonth() + 1) + "-" + $scope.inputData.d.getDate();
                    tempTime = new Date(tempTime+"T00:00:00");
                    for (var i = 0; i < 96; i++) {
                        room.slot.push({
                            "time": tempTime,
                            "type": "free",
                            "highlight": false,
                                "selected": false,
                                "startDurationTime": null,
                                "endDurationTime": null
                        });
                        tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
                    }
                }
            };

            $timeout(function() {
                $scope.nearbydata = $scope.$eval($attr.nearbydata);
                $scope.clicknumber = $scope.$eval($attr.clicknumber);
                angular.forEach($scope.nearbydata, function(building, index) {
                    angular.forEach(building.room, function(rm) {
                        $scope.createSlots(rm);
                    });
                });
            }, 1)
            $timeout(function() {

                $anchorScroll("nearbyBuilding" + $scope.clicknumber);
                angular.forEach($scope.nearbydata, function(building, index) {
                    building.initScrollDiv = 900;
                    $scope.scrollToTime(building.initScrollDiv, index);
                })
                $scope.inputData.loader = false;
            }, 1)

            $scope.creatEvent = function(room, index){
            $scope.reservationComplete = false;
            $scope.eventLoader = true;
              // console.log(roomName, roomUid, startDurationTime, endDurationTime, timezone)
             var req={
                "attendeeUid":"FF5CE544-D5B2-9FBB-5C78-7A392E26B701",
                "attendeeName": "sudarshan",
                "attendeeEmail":"sudarshan_koyalkar@apple.com",
                "roomName":room.roomName,
                "roomUid":room.roomUid,
                "startTime": $filter('date')(room.slot[index].startDurationTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC'),
                "endTime":$filter('date')(room.slot[index].endDurationTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC'),
                "timeZone":$scope.inputData.timezone
              };
              responseGrid.bookRoom(req).then(function(res) {
                  console.log(res);
                  $scope.reservationComplete = true;
                  if (res.data.success) {
                    for (i = $scope.startIndex; i < $scope.endIndex + 1; i++) {
                        room.slot[i].type = "busy";
                    }
                    $scope.eventLoader = false;
                    $scope.reservationComplete = true;
                  }else{
                    // eror message

                  }
              })

              // responseGrid.bookRoom(req).then(function(res) {
              //   responseGrid.getMultipleRoomsData($scope.reqDataMulti).then(function(res) {
              //       $scope.reservationComplete = true;
              //
              //       //  $timeout(function() {
              //       // $scope.multiroom_data = res.data.data;
              //       //     angular.forEach($scope.multiroom_data, function(room, m) {
              //       //         $scope.createSlots(room);
              //       //     });
              //       $scope.nearbydata = null;
              //       $scope.inputData.showNearByRoom = [false, false, false, false];
              //       $scope.inputData.clickNumber = 0;
              //       $scope.eventLoader = false;
              //       $scope.scrollToTime($scope.initScrollDiv);
              //        },3000);
              //   })
              // })
            }

            $scope.addDurationClass = function(obj, index) {
                $scope.reservationComplete = false;
                  $scope.reservationInComplete = false;
                var startIndex = 0;
                var durationIndex = $scope.inputData.durationIndex + 1;
                var endIndex = 0;
                if ($scope.inputData.durationIndex > 0) {
                    for (var i = index; i < index + durationIndex; i++) {
                        if (obj.slot[i].type == 'free') {
                            startIndex = index;
                            endIndex = i;
                        } else {
                            for (var j = index; j > endIndex - durationIndex; j--) {
                                if (obj.slot[j].type == 'free') {
                                    startIndex = j;
                                } else {
                                    break;
                                }
                            }
                            break;
                        }
                    }
                } else {
                    startIndex = index;
                    endIndex = index;
                }

                for (i = startIndex; i < endIndex + 1; i++) {
                    obj.slot[i].highlight = true;
//                    obj.slot[i].startDurationTime = obj.slot[startIndex].time;
//                    obj.slot[i].endDurationTime = obj.slot[endIndex + 1].time;
                }

            }

            $scope.appendZero = function(inNumber) {
                return (inNumber <= 9) ? "0" + inNumber : inNumber;
            };

            $scope.removeDurationClass = function(building, index) {
                angular.forEach(building.room, function(room){
                    angular.forEach(room.slot, function(slot){
                        slot.highlight = false;
                    })
                })
            };

            $scope.addSelectedClass = function(building, obj, index) {
               $scope.reservationComplete = false;
                 $scope.reservationInComplete = false;
               angular.forEach(building, function(room){
                   angular.forEach(room.slot, function(slot){
                       slot.selected = false;
                   })
               })

               $scope.startIndex = 0;
               var durationIndex = $scope.inputData.durationIndex + 1;
               $scope.endIndex = 0;
               if ($scope.inputData.durationIndex > 0) {
                   for (var i = index; i < index + durationIndex; i++) {
                       if (obj.slot[i].type == 'free') {
                           $scope.startIndex = index;
                           $scope.endIndex = i;
                       } else {
                           for (var j = index; j > $scope.endIndex - durationIndex; j--) {
                               if (obj.slot[j].type == 'free') {
                                   $scope.startIndex = j;
                               } else {
                                   break;
                               }
                           }
                           break;
                       }
                   }
               } else {
                   $scope.startIndex = index;
                   $scope.endIndex = index;
               }

               for (i = $scope.startIndex; i < $scope.endIndex + 1; i++) {
                   obj.slot[i].selected = true;
                   obj.slot[i].startDurationTime = obj.slot[$scope.startIndex].time;
                   obj.slot[i].endDurationTime = obj.slot[$scope.endIndex + 1].time;
               }
           }

            $scope.PreviousDay = function(clkNumber, tblIndex) {
                $scope.inputData.loader = true;
                var PrevDay = new Date();
                PrevDay.setDate($scope.inputData.d.getDate() - 1)
                $scope.inputData.d = PrevDay;
                $scope.inputData.searchDate = PrevDay.getFullYear() + "" + $scope.appendZero(PrevDay.getMonth() + 1) + "" + $scope.appendZero(PrevDay.getDate());
                $scope.inputData.buildingName = $scope.nearbydata[tblIndex].buildingName;
                angular.forEach($scope.nearbydata[tblIndex], function(rm, index) {
                    $scope.inputData.room.push({
                        roomName: rm.roomName,
                        roomUid: rm.roomUid
                    });
                });

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
                    $scope.nearbydata = null;
                    $scope.inputData.showNearByRoom = [false, false, false, false];
                    $scope.inputData.clickNumber = 0;
                    $scope.inputData.loader = false;
                })
            };

            $scope.Previous4Hours = function(tblIndex) {
                if ($scope.nearbydata[tblIndex].initScrollDiv > 0) {
                    $scope.nearbydata[tblIndex].initScrollDiv -= 400;
                    $scope.scrollToTime($scope.nearbydata[tblIndex].initScrollDiv, tblIndex);
                }
            };

            $scope.Next4hours = function(tblIndex) {
                if ($scope.nearbydata[tblIndex].initScrollDiv < 1900) {
                    $scope.nearbydata[tblIndex].initScrollDiv += 400;
                    $scope.scrollToTime($scope.nearbydata[tblIndex].initScrollDiv, tblIndex);
                }
            };

            $scope.NextDay = function(clkNumber, tblIndex) {
                $scope.inputData.loader = true;
                var NextDay = new Date();
                NextDay.setDate($scope.inputData.d.getDate() + 1)
                $scope.inputData.searchDate = NextDay;
                $scope.inputData.searchDate = NextDay.getFullYear() + "" + $scope.appendZero(NextDay.getMonth() + 1) + "" + $scope.appendZero(NextDay.getDate());
                $scope.inputData.buildingName = $scope.nearbydata[tblIndex].buildingName;
                angular.forEach($scope.nearbydata[tblIndex], function(rm, index) {
                    $scope.inputData.room.push({
                        roomName: rm.roomName,
                        roomUid: rm.roomUid
                    });
                });
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
                    $scope.nearbydata = null;
                    $scope.inputData.showNearByRoom = [false, false, false, false];
                    $scope.inputData.clickNumber = 0;
                    $scope.inputData.loader = false;
                })
            };

        }
    }
});
