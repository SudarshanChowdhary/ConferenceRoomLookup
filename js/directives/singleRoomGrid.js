ConferenceRoomLookup.directive("singleRoomGrid", function($anchorScroll, $document, $timeout, $http, $uibModal, $filter, $compile, responseGrid) {
    return {
        restrict: "E",
        templateUrl: "views/singleRoomGrid.html",
        $scope: {
            singleroom_data: "@"
        },
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
                $scope.hours = ["12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM", "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"];
            };

            $scope.creatEvent = function(index){
            $scope.reservationComplete = false;
              $scope.eventLoader = true;
              var req={
                "attendeeUid":"FF5CE544-D5B2-9FBB-5C78-7A392E26B701",
                "attendeeName": "sudarshan",
                "attendeeEmail":"sudarshan_koyalkar@apple.com",
                "roomName":$scope.inputData.room.roomName,
                "roomUid":$scope.inputData.room.roomUid,
                "startTime": $filter('date')($scope.singleroom_data.slot[index].startDurationTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC'),
                "endTime":$filter('date')($scope.singleroom_data.slot[index].endDurationTime, 'yyyy-MM-ddTHH:mm:ss', 'UTC'),
                "timeZone":$scope.inputData.timezone
              };
              
              console.log(req);

              responseGrid.bookRoom(req).then(function(res){
                console.log(res);
                responseGrid.getSingleRoomData($scope.reqDataSingle).then(function(res){
                    $scope.reservationComplete = true;
                     $timeout(function() {
                  $scope.singleroom_data = res.data.data;
                  $scope.createSingleRoomSlots($scope.singleroom_data);
                  angular.element("#singleRoom").html("");
                  angular.element("#singleRoom").append($compile("<single-room-grid></single-room-grid>")($scope));
                  $scope.eventLoader = false;
//                  $scope.$apply();
                    },3000);
                })
              })
            }

            $scope.addDurationClass = function(obj, index) {
                 $scope.reservationComplete = false;
                var startIndex = index;
                $scope.durationFlag = true;
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

            $scope.addSelectedClass = function(obj, index) {

                for (var i = 0; i < 96; i++) {
                    obj.slot[i].selected = false;
                }

                var startIndex = index;
                $scope.selectedDurationFlag = true;
                for (var i = index; i < index + $scope.inputData.durationIndex + 1; i++) {
                    if (obj.slot[i].type != 'free') {
                        startIndex --;
                        if (obj.slot[startIndex].type != 'free') {
                            $scope.selectedDurationFlag = false;
                        }
                    }
                }
                if ($scope.selectedDurationFlag && startIndex <= index) {
                    for (var i = startIndex; i < startIndex + $scope.inputData.durationIndex + 1; i++) {
                        obj.slot[i].selected = true;
                    }
                }else if(!$scope.selectedDurationFlag){
                      obj.slot[index].selected = true;
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

