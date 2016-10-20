ConferenceRoomLookup.directive("singleRoomGrid", function($anchorScroll, $document, $timeout, $http, $uibModal) {
                return {
                    restrict: "E",
                    templateUrl: "views/singleRoomGrid.html",
										$scope:{searchFormData: "=searchFormData"},
                    link: function($scope, $ele, $attr) {

                       // $scope.loader = true;
                        console.log($scope.searchFormData);
                
                         var reqData = {
                "roomName" : $scope.searchFormData.roomName,
                "roomUid" : $scope.searchFormData.roomUid, 
                "searchDate" : $scope.searchFormData.searchDate,
                "timeRange": $scope.searchFormData.timeRange,
                "timezone":$scope.searchFormData.timezone,
                "unavailable" : $scope.searchFormData.unavailable
        }
					  console.log(JSON.stringify(reqData));

                        $http({
                          //  url: "js/services/singleRoom-data.json",
                            url: "http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/api/lookupbyroom/?format=json",
                            method: "POST",
                            data: JSON.stringify(reqData),
                            headers: {'Content-Type': 'application/json'} 
        //                      headers : {
        // 			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    				// } 
                        }).then(function(res) {  
                        	alert("hiiasfasdfasdf");                          
                            $scope.singleRoomData = res.data.data;
                            console.log($scope.singleRoomData);
                            $scope.createSingleRoomSlots($scope.singleRoomData);
                            $scope.loader = false;
                        });

												$scope.scrollToTime = function(initScrollDiv) {
														var el = $document.find("#searchRoomGrid .table-responsive")
														console.log(initScrollDiv);
														el.scrollLeft(initScrollDiv);
												}

												$scope.createSingleRoomSlots = function(room) {
											         if (room.events.length != 0) {
											             var dt = room.events[0].startDateTime;
											             dt = dt.split("T");
											             var temp = new Date(dt[0] + "T00:00:00");
											             var endDayTime = new Date(dt[0] + "T23:59:00");
											             console.log("temp", temp)
											             room.slot = [];
											             angular.forEach(room.events, function(events, n) {
											                 events.endDateTime = events.endDateTime.split(".")[0];
											                 events.startDateTime = events.startDateTime.split(".")[0];

											                 console.log(events.endDateTime);
											                 console.log(events.startDateTime);

											                 var sdt = new Date(events.startDateTime);
											                 var edt = new Date(events.endDateTime);
											                 console.log(sdt);
											                 console.log("sdt", sdt.getTime(), "temp", temp.getTime())
											                 var freeTime = sdt.getTime() - temp.getTime();
											                 freeTime = ((freeTime / 1000) / 60) / 15;
											                 freeTime = freeTime.toFixed();
											                 console.log(freeTime);

											                 var tempTime = temp;
											                 for (var i = 0; i < freeTime; i++) {
											                     room.slot.push({
											                         "time": tempTime,
											                         "type": "free",
											                         "highlight": false
											                     });
											                     tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
											                 }
											                 console.log("edt", edt.getTime(), "sdt", sdt.getTime())
											                 var busyTime = edt.getTime() - sdt.getTime();
											                 busyTime = ((busyTime / 1000) / 60) / 15;
											                 busyTime = busyTime.toFixed();
											                 console.log(busyTime);
											                 for (var i = 0; i < busyTime; i++) {
											                     if (i === 0) {
											                         room.slot.push({
											                             "time": tempTime,
											                             "type": "busy",
											                             "highlight": false,
											                             "firstCell": true,
											                             "organizer": events.organizer,
											                             "busyTill": new Date(events.endDateTime),
											                             "numberOfBusySlots": busyTime
											                         });
											                     } else {
											                         room.slot.push({
											                             "time": tempTime,
											                             "type": "busy",
											                             "highlight": false
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
											                             "highlight": false
											                         });
											                         tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
											                     }
											                 }
											             });
											         } else {
											             room.slot = [];
											             var tempTime = new Date("2016-07-25T00:00:00");
											             for (var i = 0; i < 96; i++) {
											                 room.slot.push({
											                     "time": tempTime,
											                     "type": "free",
											                     "highlight": false
											                 });
											                 tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
											             }
											         }
											         var tempHours = new Date("2016-07-25T00:00:00");
											         $scope.hours = [];

											         for (var i = 0; i < 96; i = i + 4) {
											             $scope.hours.push(tempHours);
											             tempHours = new Date(tempHours.getTime() + (60 * 60 * 1000));
											         }

											         var tempTime = new Date("2016-07-25T00:00:00");
											         for (var i = 0; i < 96; i++) {
											             room.slot[i].time = tempTime;
											             tempTime = new Date(tempTime.getTime() + (1000 * 60 * 15));
											         }

											         $anchorScroll("searchRoomGrid");
											         $scope.initScroll = 9;
											         $timeout(function() {
											             $scope.initScrollDiv = 900;
											             $scope.scrollToTime($scope.initScrollDiv);
											         }, 10);
											     };


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
