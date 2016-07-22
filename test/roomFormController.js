app.controller('roomFormController', function($scope, Service) {
      //If body content visible
      if(document.getElementById('bodyContent').style.display!='none'){
        document.getElementById('bodyContent').style.display = 'none';
        document.getElementById('bodyContent').style.visibility = 'hidden';
      }
      var roomId = Service.getSelectedRoom();
      //Geeting room data
      Service.getRooms().then(function(rooms) {  
      $scope.rooms = rooms;
      console.log('room profile')
      console.log(rooms)
      console.log(roomId)
      $scope.editForm = [];//var keepGoing = true;
      angular.forEach(rooms, function(roomData) {
      if(roomData.roomId == roomId ){
            //$scope.editForm.push(roomData);
            Service.setSelectedRoom(roomData.roomId);
            $scope.regionRoom = roomData.regionId;
            $scope.regionName = roomData.regionName;
            $scope.campusRoom = roomData.campusId;
            $scope.campusName = roomData.campusName;
            $scope.buildingRoom = roomData.buildingId;
            $scope.buildingName = roomData.buildingName;
            $scope.selectedRoomList = roomData.roomName;
            $scope.fullName = roomData.fullName;
            $scope.reporting = roomData.reporting;
            if (roomData.reporting === 1) {
                $scope.reportingYes="active";
            } else {
                $scope.reportingNo="active";
            }
            $scope.takeoverDisabled = roomData.takeoverDisabled;
            if (roomData.takeoverDisabled === 1) {
                $scope.takeoverYes="active";
            } else {
                $scope.takeoverNo="active";
            }
            $scope.cancelSingle = roomData.cancelSingle;
            if (roomData.cancelSingle === 1) {
                $scope.cancelSingleYes="active";
            } else {
                $scope.cancelSingleNo="active";
            }
            $scope.cancelRecurring = roomData.cancelRecurring;
            if (roomData.cancelRecurring === 1) {
                $scope.cancelRecurringYes="active";
            } else {
                $scope.cancelRecurringNo="active";
            }
            $scope.busHrsStart = roomData.businessHourStart;
            $scope.busHrsEnd = roomData.businessHourEnd;
            $scope.threshold = parseInt(roomData.confirmThreshold)
            $scope.missedEventCancellation = parseInt(roomData.missedEventCancellation);
            $scope.missedEventWarning = parseInt(roomData.missedEventWarning);
            return false;
        }
      });
        $scope.submitForm = function () {
          $http.post('https://istwebdev1.corp.apple.com/dashboardapi/api/checkin/room/update/', $scope.roomForm
              ).success(function(data, status, headers, config) {
                  if (data.result != ''){
                      console.log('add room sucess msg');
                      alert(data.result);
                  }else{
                      console.log('add room error1');
                      console.log(data.error);
                  }
              }).error(function(data, status) {
                      console.log('add room error2');
                      console.log(status);
              });
            /*  $http({
                    url: "url",
                    data: $scope.roomForm,
                    method: 'POST',
                    headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
              }).success(function(data){
                    console.log("Updated Sucessfully", data)
              }).error(function(err){"ERR", console.log(err)})*/
       };
       $scope.hideRoomPage = function () {
         document.getElementById('bodyContent').style.display = 'block'
         document.getElementById('bodyContent').style.visibility = 'visible'
       }

    });
});
