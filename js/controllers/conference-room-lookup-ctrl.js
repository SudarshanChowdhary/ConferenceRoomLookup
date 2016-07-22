'use strict'

ConferenceRoomLookup.controller("ConferenceRoom", function($scope, siteService, buildingService, floorService, roomService, timeRangeService){
	$scope.enableFloor= false;

	$scope.siteOptions= siteService.get();



    //
	// var site = $scope.siteOptions;
	// var output = [{"regionId" : site.regionId , "regionName" : site.regionName, "campusId" : site.campusId, "campusName" : site.campusName}];
	// for (var i=0; i < site.size; i ++) {
	// 	output.concat({"regionId" : site.regionId , "regionName" : site.regionName, "campusId" : site.campusId, "campusName" : site.campusName});
	// }
	// output = {"data" : output, "success" : true};
    //
	// $scope.siteOptions = output;


	console.log($scope.siteOptions);

	$scope.buildingOptions=null;

	$scope.durationTime = {
		model: null,
		availableOptions:[

			{name: "15 minutes", value: "0.25"},{name: "30 minutes", value: "0.5"},{name: "45 minutes", value: "0.75"},{name: "1 hour", value: "1"},{name: "1.15 minutes", value: "1.15"},{name: "1.30 minutes", value: "1.5"},
			{name: "1.45 minutes", value: "1.75"},{name: "2 hour", value: "2"},{name: "2.15 minutes", value: "2.25"},{name: "2.30 minutes", value: "2.5"},{name: "2.45 minutes", value: "2.75"},{name: "3 hour", value: "3"},
			{name: "3.15 minutes", value: "3.25"},{name: "3.30 minutes", value: "3.5"},{name: "3.45 minutes", value: "3.75"},{name: "4 hour", value: "4"},{name: "4.15 minutes", value: "4.25"},{name: "4.30 minutes", value: "4.5"},
			{name: "4.45 minutes", value: "4.75"},{name: "5 hour", value: "5"},{name: "5.15 minutes", value: "5.25"},{name: "5.30 minutes", value: "5.5"},{name: "5.45 minutes", value: "5.75"},{name: "6 hour", value: "7"},
			{name: "6.15 minutes", value: "6.25"},{name: "6.30 minutes", value: "6.5"},	{name: "6.45 minutes", value: "6.75"},{name: "7 hour", value: "7"},{name: "7.15 minutes", value: "7.25"},{name: "7.30 minutes", value: "7.5"},
			{name: "7.45 minutes", value: "7.75"},{name: "8 hour", value: "8"},	{name: "8.15 minutes", value: "8.25"},{name: "8.30 minutes", value: "8.5"},	{name: "8.45 minutes", value: "8.75"}

		]};

	$scope.timeFrom = timeRangeService.getFromTimeOptions();
	$scope.timeTo = timeRangeService.getToTimeOptions();



	$scope.loadBuilding= function(site){
		if(!site){

			$scope.disableBuilding= false;
			$scope.lookupRoom.building = null;

			$scope.disableFloor= false;
			$scope.lookupRoom.floor = null;

			$scope.disableRoom= false;
			$scope.lookupRoom.room = null;

		}
		else{
			$scope.disableBuilding = true;
			$scope.buildingOptions = buildingService.get(site);
		}
	};

	$scope.loadRooms = function(building){
		if(!building){

			$scope.disableRoom= false;
			$scope.roomData = null;
			$scope.floorData = null;
		}else{

			//ToDo: When only one service gives all the data
			// angular.forEach($scope.buildingOptions.building, function(obj, index) {
			// 	console.log(obj, index);

			// angular.forEach(obj, function(obj, index) {
			// 	console.log(obj, index);
			// });

			// });


			angular.forEach($scope.buildingOptions.building, function(obj, value) {
				if(value==building){
					if(obj.floor)
					{
						$scope.enableFloor= true;
						$scope.floorOptions= floorService.get();
						$scope.disableFloor= true;
					}
					else{
						$scope.disableFloor= false;
						$scope.lookupRoom.floor = null;
						$scope.floorOptions=null;
						$scope.enableFloor= false;

					}
				}
			});
			$scope.disableRoom= true;
			$scope.roomOptions= roomService.get();
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

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','EEEE, MMMM dd, yyyy'];
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
	$scope.events = [
		{
			date: tomorrow,
			status: 'full'
		},
		{
			date: afterTomorrow,
			status: 'partially'
		}
	];

	function getDayClass(data) {
		var date = data.date,
			mode = data.mode;
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0,0,0,0);

			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}

		return '';
	}

});