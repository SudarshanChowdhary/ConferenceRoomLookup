'use strict'

ConferenceRoomLookup.controller("ConferenceRoom", function($scope, siteService, durationService, timeRangeService) {

    $scope.lookUpData = {};
    $scope.lookupRoom={};
    $scope.siteOptions = [];
    $scope.buildingOptions = [];
    $scope.floorOptions=[];
    $scope.roomOptions=[];

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
        var uniqueCountries = uniqueData($scope.lookUpData, "campus");

        for (var i = 0; i < uniqueRegions.length; i++) {
            for (var j = 0; j < uniqueCountries.length; j++) {
                for (var k = 0; k < $scope.lookUpData.length; k++) {
                    if ($scope.lookUpData[k].regionId === uniqueRegions[i] && $scope.lookUpData[k].campus === uniqueCountries[j]
                        && $scope.siteOptions[i].campus.indexOf($scope.lookUpData[k].campus) === -1) {
                        $scope.siteOptions[i].campus.push($scope.lookUpData[k].campus);
                    }
                }
            }
        }
    });

    $scope.durationTime = durationService.getDuration();
    $scope.timeFrom = timeRangeService.getFromTimeOptions();
    $scope.timeTo = timeRangeService.getToTimeOptions();

    $scope.loadBuilding = function(country) {
        $scope.buildingOptions = [];
        if (!country) {
            $scope.lookupRoom.buildingName = null;
            $scope.lookupRoom.floorNumber = null;
            $scope.lookupRoom.roomName = null;

            $scope.disableBuilding = false;
            $scope.disableFloor = false;
            $scope.disableRoom = false;
        } else {
            $scope.disableBuilding = true;
            angular.forEach($scope.lookUpData, function(obj, index) {
                if (obj.country === country && $scope.buildingOptions.indexOf(obj.buildingName) === -1) {
                    $scope.buildingOptions.push(obj.buildingName);
                }
            })
        }
    };

    $scope.loadFloor = function(buildingName) {
        $scope.floorOptions = [];
        $scope.roomOptions =[];
        if (!buildingName) {

            $scope.lookupRoom.floorNumber = null;
            $scope.lookupRoom.roomName = null;

            $scope.disableFloor = false;
            $scope.disableRoom = false;
        } else {
            $scope.disableFloor= true;
            $scope.disableRoom = true;
            angular.forEach($scope.lookUpData, function(obj) {

                // Loading Rooms
                if(buildingName === obj.buildingName){
                    $scope.roomOptions.push(obj.roomName);
                }

                // Loading Floors
                if(obj.country === $scope.lookupRoom.country && obj.buildingName === buildingName && $scope.floorOptions.indexOf(obj.floorNumber)===-1){
                    $scope.floorOptions.push(obj.floorNumber);
                }

            });



        }
    };


    $scope.loadRoom = function(floorNumber, buildingName) {
        $scope.roomOptions = [];
        if (!floorNumber || !buildingName) {
            $scope.lookupRoom.roomName = null;
            $scope.disableRoom = false;

            angular.forEach($scope.lookUpData, function(obj) {
                // Loading Rooms
                if(buildingName === obj.buildingName){
                    $scope.roomOptions.push(obj.roomName);

                }
            });

        } else {
            $scope.disableRoom = true;
            angular.forEach($scope.lookUpData, function(obj) {
                if(obj.buildingName === buildingName && obj.floorNumber == floorNumber ){
                    $scope.roomOptions.push(obj.roomName);
                }
            });
        }
    };
    $scope.avaliableSeats = function (roomNameVal){
        console.log($scope.lookUpData);
        for(var i =0; i<$scope.lookUpData.length; i++){
            console.log($scope.lookUpData[i].roomName);
            if($scope.lookUpData[i].roomName === roomNameVal){
                console.log('$scope.lookUpData[i].roomName :: ',$scope.lookUpData[i].roomName);
                $scope.sizeVal = $scope.lookUpData[i].size;
                console.log('$scope.sizeVal',$scope.sizeVal);
                break;
            }else {
                console.log('No room');
            }
        }
        console.log('$scope.sizeVal ::',$scope.sizeVal);

    };
        $scope.checked = function () {

            if(roomOptions.size == -1){
                alert("seats are there")

            }else {
        alert("seats are not available");
            }
        };

    /*date picker component*/

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'EEEE, MMMM dd, yyyy'];
    $scope.format = $scope.formats[4];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

});