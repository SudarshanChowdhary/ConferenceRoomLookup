ConferenceRoomLookup.directive("nearbyRoomGrid", function($anchorScroll, $document, $timeout) {
    return {
        restrict: "E",
        templateUrl: "views/nearByRoomGrid.html",
        $scope: {
            nearby_data:"@",
            searchFormData:"@"
        },
        transclude: true,
        link: function($scope, $ele, $attr) {
            $scope.loader = true;
            $scope.gridheader = false;
            console.log($scope.nearby_data)
            var createSlots = function(room) {
                $scope.gridheader = true;
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
                        for (var i = 0; i < freeTime; i++) {
                            room.slot.push({
                                "type": "free",
                                "highlight": false
                            });
                        }
                        var busyTime = edt.getTime() - sdt.getTime();
                        busyTime = ((busyTime / 1000) / 60) / 15;
                        busyTime = busyTime.toFixed();
                        for (var i = 0; i < busyTime; i++) {
                            room.slot.push({
                                "type": "busy",
                                "highlight": false
                            });
                        }
                        temp = edt;

                        if (n == room.busyslot.length - 1 && edt.getTime() < endDayTime.getTime()) {
                            var freeTime = endDayTime.getTime() - edt.getTime();
                            freeTime = ((freeTime / 1000) / 60) / 15;
                            freeTime = freeTime.toFixed();
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

            };

               angular.forEach($scope.nearby_data, function(rm) {
                    createSlots(rm);
                });

                $anchorScroll("multiRoomDirective_"+$scope.clickedNumber);
                $timeout(function() {
                    $scope.scrollToTime(900)
                }, 10);

            $scope.scrollToTime = function(initScrollDiv) {
                var el = $document.find("#multiRoomDirective_"+$scope.clickedNumber+" #searchRoomGrid .table-responsive");
                el.scrollLeft(initScrollDiv);
            }

            $scope.addDurationClass = function(obj, index) {
                $scope.startIndex = index;
                $scope.durationFlag = true;
                for (var i = index; i < index + $scope.durationTime.indexOf($scope.searchFormData.duration) + 1; i++) {
                    if (obj.slot[i].type != 'free') {
                        $scope.startIndex--;
                        if (obj.slot[$scope.startIndex].type != 'free') {
                            $scope.durationFlag = false;
                        }
                    }
                }
                if ($scope.durationFlag) {
                    for (var i = $scope.startIndex; i < $scope.startIndex + $scope.durationTime.indexOf($scope.searchFormData.duration) + 1; i++) {
                        obj.slot[i].highlight = true;
                    }
                }
            }

            $scope.removeDurationClass = function(obj, index) {
                for (var i = $scope.startIndex; i < $scope.startIndex + $scope.durationTime.indexOf($scope.searchFormData.duration) + 1; i++) {
                    obj.slot[i].highlight = false;
                }
            };
        }
    }
});