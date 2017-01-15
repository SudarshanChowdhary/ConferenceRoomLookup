ConferenceRoomLookup.directive("singleRoomGrid", function($anchorScroll, $document, $timeout, $http, $uibModal, $filter, $compile, responseGrid) {
    return {
        restrict: "E",
        templateUrl: "views/singleRoomGrid.html",
        link: function($scope, $ele, $attr) {
            $scope.bookSlot = {
                templateUrl: 'bookSlot.html'
            };
            $scope.createSingleRoomSlots = function(room) {
                if (room.events.length != 0) {
                    var dt = room.events[0].startDateTime;
                    dt = dt.split("T");
                    var temp = new Date(dt[0] + "T00:00:00");
                    var endDayTime = new Date(dt[0] + "T23:59:00");
                    room.slot = [];
                    angular.forEach(room.events, function(events, n) {
                        events.endDateTime = events.endDateTime.split(".")[0];
                        events.startDateTime = events.startDateTime.split(".")[0];

                        var sdt = new Date(events.startDateTime);
                        var edt = new Date(events.endDateTime);
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
                            if (i === 0) {
                                room.slot.push({
                                    "time": tempTime,
                                    "displayTime": events.startDateTime.split("T")[1],
                                    "type": "busy",
                                    "highlight": false,
                                    "selected": false,
                                    "firstCell": true,
                                    "organizer": events.organizer,
                                    "busyTill": events.endDateTime.split("T")[1],
                                    "numberOfBusySlots": busyTime,
                                    "startDurationTime": null,
                                    "endDurationTime": null
                                });
                            } else {
                                room.slot.push({
                                    "time": tempTime,
                                    "type": "busy",
                                    "highlight": false,
                                    "selected": false,
                                    "startDurationTime": null,
                                    "endDurationTime": null
                                });
                            }
                            tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
                        }
                        temp = edt;

                        if (n == room.events.length - 1 && edt.getTime() < endDayTime.getTime()) {
                            var freeTime = endDayTime.getTime() - temp.getTime();
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
                    tempTime = new Date(tempTime + "T00:00:00");
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
                $scope.hours = ["12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM", "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"];
            };

            $scope.creatEvent = function(index) {
                $scope.reservationComplete = false;
                $scope.reservationError = false;

                $scope.eventLoader = true;
                var req = {
                    "attendeeUid": "FF5CE544-D5B2-9FBB-5C78-7A392E26B701",
                    "attendeeName": "sudarshan",
                    "attendeeEmail": "sudarshan_koyalkar@apple.com",
                    "roomName": $scope.inputData.room.roomName,
                    "roomUid": $scope.inputData.room.roomUid,
                    "startTime": $filter('date')($scope.singleroom_data.slot[index].startDurationTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC'),
                    "endTime": $filter('date')($scope.singleroom_data.slot[index].endDurationTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC'),
                    "timeZone": $scope.inputData.timezone
                };

                responseGrid.bookRoom(req).then(function(res) {
                    $scope.eventLoader = false;
                    $scope.reservationComplete = true;
                    if (res.data.success) {
                      for (i = $scope.startIndex; i < $scope.endIndex + 1; i++) {
                          $scope.singleroom_data.slot[i].type = "busy";
                          if(i==$scope.startIndex){
                          $scope.singleroom_data.slot[i].displayTime=req.startTime.split("T")[1];
                          $scope.singleroom_data.slot[i].busyTill=req.endTime.split("T")[1];
                          $scope.singleroom_data.slot[i].organizer = {email:req.attendeeEmail, name:req.attendeeName};
                          $scope.singleroom_data.slot[i].firstCell = true;
                          $scope.singleroom_data.slot[i].numberOfBusySlots= $scope.endIndex + 1
                        }
                      }
                      $timeout(function () {

                      }, 10000);
                    }else{
                        $scope.eventLoader = false;
                        $scope.reservationError = true;
                        $timeout(function () {

                        }, 10000);
                      // error message
                    }
                })
            }

            $scope.addDurationClass = function(obj, index) {
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

            $scope.removeDurationClass = function(obj, index) {
                for (var i = 0; i < 96; i++) {
                    obj.slot[i].highlight = false;
                }
            };

            $scope.addSelectedClass = function(obj, index) {
              $scope.reservationComplete = false;
              $scope.reservationError = false;

              // angular.forEach(obj, function(item) {
              //   item.selected = false;
              // })

              for (var i = 0; i < 96; i++) {
                  obj.slot[i].selected = false;
              }


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


            $timeout(function() {
                $scope.createSingleRoomSlots($scope.singleroom_data);
                $anchorScroll("singleRoom");
            }, 10);

            $scope.open = function(slot) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'myModalContent.html',
                    controller: 'singleRoomForm',
                    size: 'md',
                    resolve: {
                        items: function() {
                            return slot;
                        }
                    }
                });

                modalInstance.result.then(function(selectedItem) {

                }, function() {});
            };
        }
    }
});
