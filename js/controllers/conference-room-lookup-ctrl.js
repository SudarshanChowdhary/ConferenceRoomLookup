'use strict'

ConferenceRoomLookup.controller("ConferenceRoom", function($scope, siteService, buildingService, floorService, roomService){
	$scope.enableFloor= false;

	$scope.siteOptions= siteService.get();
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

	$scope.timeFrom = {
		model: null,
		fromOptions:[
			{name: "12:00 AM", value: "12:00 AM"},{name: "12:15 AM", value: "12:15 AM"},{name: "12:30 AM", value: "12:30 AM"},{name: "12:45 AM", value: "12:45 AM"},{name: "1:00 AM", value: "1:00 AM"},
			{name: "1:15 AM", value: "1:15 AM"},{name: "1:30 AM", value: "1:30 AM"},{name: "1:45 AM", value: "1:45 AM"},{name: "2:00 AM", value: "2:00 AM"},{name: "2:15 AM", value: "2:15 AM"},{name: "2:30 AM", value: "2:30 AM"},{name: "2:45 AM", value: "2:45 AM"},{name: "3:00 AM", value: "3:00 AM"},
			{name: "3:15 AM", value: "3:15 AM"},{name: "3:30 AM", value: "3:30 AM"},{name: "3.45 AM", value: "3.45 AM"},{name: "4:00 AM", value: "4:00 AM"},{name: "4:15 AM", value: "4:15 AM"},{name: "4:30 AM", value: "4:30 AM"},
			{name: "4:45 AM", value: "4:45 AM"},{name: "5:00 AM", value: "5:00 AM"},{name: "5:15 AM", value: "5:15 AM"},{name: "5:30 AM", value: "5:30 AM"},{name: "5:45 AM", value: "5:45 AM"},{name: "6:00 AM", value: "6:00 AM"},
			{name: "6:15 AM", value: "6:15 AM"},{name: "6:30 AM", value: "6:30 AM"},{name: "6:45 AM", value: "6:45 AM"},{name: "7:00 AM", value: "7:00 AM"},{name: "7:15 AM", value: "7:15 AM"},{name: "7:30 AM", value: "7:30 AM"},
			{name: "7:45 AM", value: "7.45 AM"},{name: "8:00 AM", value: "8:00 AM"},{name: "8:15 AM", value: "8:15 AM"},{name: "8:30 AM", value: "8:30 AM"},{name: "8:45 AM", value: "8:45 AM"},
			{name: "9:00 AM", value: "9:00 AM"},{name: "9:30 AM", value: "9:30 AM"},{name: "9:45 AM", value: "9:45 AM"},{name: "10:00 AM", value: "10:00 AM"},{name: "10:15 AM", value: "10:15 AM"},{name: "10:30 AM", value: "10:30 AM"},{name: "10:45 AM", value: "10:45 AM"},
			{name: "11:00 AM", value: "11:00 AM"},{name: "11:15 AM", value: "11:15 AM"},{name: "11:30 AM", value: "11:30 AM"},{name: "11:45 AM", value: "11:45 AM"},
			{name: "12:00 PM", value: "12:00 PM"},{name: "12:15 PM", value: "12:15 PM"},{name: "12:30 PM", value: "12:30 PM"},{name: "12:45 PM", value: "12:45 PM"},{name: "1:00 PM", value: "1:00 PM"},
			{name: "1:15 PM", value: "1:15 PM"},{name: "1:30 PM", value: "1:30 PM"},{name: "1:45 PM", value: "1:45 PM"},{name: "2:00 PM", value: "2:00 PM"},{name: "2:15 PM", value: "2:15 PM"},{name: "2:30 PM", value: "2:30 PM"},{name: "2:45 PM", value: "2:45 PM"},{name: "3:00 PM", value: "3:00 PM"},
			{name: "3:15 PM", value: "3:15 PM"},{name: "3:30 PM", value: "3:30 PM"},{name: "3.45 PM", value: "3.45 PM"},{name: "4:00 PM", value: "4:00 PM"},{name: "4:15 PM", value: "4:15 PM"},{name: "4:30 PM", value: "4:30 PM"},
			{name: "4:45 PM", value: "4:45 PM"},{name: "5:00 PM", value: "5:00 PM"},{name: "5:15 PM", value: "5:15 PM"},{name: "5:30 PM", value: "5:30 PM"},{name: "5:45 PM", value: "5:45 PM"},{name: "6:00 PM", value: "6:00 PM"},
			{name: "6:15 PM", value: "6:15 PM"},{name: "6:30 PM", value: "6:30 PM"},{name: "6:45 PM", value: "6:45 PM"},{name: "7:00 PM", value: "7:00 PM"},{name: "7:15 PM", value: "7:15 PM"},{name: "7:30 PM", value: "7:30 PM"},
			{name: "7:45 PM", value: "7.45 PM"},{name: "8:00 PM", value: "8:00 PM"},{name: "8:15 PM", value: "8:15 PM"},{name: "8:30 PM", value: "8:30 PM"},{name: "8:45 PM", value: "8:45 PM"},
			{name: "9:00 PM", value: "9:00 PM"},{name: "9:30 PM", value: "9:30 PM"},{name: "9:45 PM", value: "9:45 PM"},{name: "10:00 PM", value: "10:00 PM"},{name: "10:15 PM", value: "10:15 PM"},{name: "10:30 PM", value: "10:30 PM"},{name: "10:45 PM", value: "10:45 PM"},
			{name: "11:00 PM", value: "11:00 PM"},{name: "11:15 PM", value: "11:15 PM"},{name: "11:30 PM", value: "11:30 PM"},{name: "11:45 PM", value: "11:45 PM"}


		]};

	$scope.timeTo = {
		model: null,
		toOptions:[
			{name: "12:00 AM", value: "12:00 AM"},{name: "12:15 AM", value: "12:15 AM"},{name: "12:30 AM", value: "12:30 AM"},{name: "12:45 AM", value: "12:45 AM"},{name: "1:00 AM", value: "1:00 AM"},
			{name: "1:15 AM", value: "1:15 AM"},{name: "1:30 AM", value: "1:30 AM"},{name: "1:45 AM", value: "1:45 AM"},{name: "2:00 AM", value: "2:00 AM"},{name: "2:15 AM", value: "2:15 AM"},{name: "2:30 AM", value: "2:30 AM"},{name: "2:45 AM", value: "2:45 AM"},{name: "3:00 AM", value: "3:00 AM"},
			{name: "3:15 AM", value: "3:15 AM"},{name: "3:30 AM", value: "3:30 AM"},{name: "3.45 AM", value: "3.45 AM"},{name: "4:00 AM", value: "4:00 AM"},{name: "4:15 AM", value: "4:15 AM"},{name: "4:30 AM", value: "4:30 AM"},
			{name: "4:45 AM", value: "4:45 AM"},{name: "5:00 AM", value: "5:00 AM"},{name: "5:15 AM", value: "5:15 AM"},{name: "5:30 AM", value: "5:30 AM"},{name: "5:45 AM", value: "5:45 AM"},{name: "6:00 AM", value: "6:00 AM"},
			{name: "6:15 AM", value: "6:15 AM"},{name: "6:30 AM", value: "6:30 AM"},{name: "6:45 AM", value: "6:45 AM"},{name: "7:00 AM", value: "7:00 AM"},{name: "7:15 AM", value: "7:15 AM"},{name: "7:30 AM", value: "7:30 AM"},
			{name: "7:45 AM", value: "7.45 AM"},{name: "8:00 AM", value: "8:00 AM"},{name: "8:15 AM", value: "8:15 AM"},{name: "8:30 AM", value: "8:30 AM"},{name: "8:45 AM", value: "8:45 AM"},
			{name: "9:00 AM", value: "9:00 AM"},{name: "9:30 AM", value: "9:30 AM"},{name: "9:45 AM", value: "9:45 AM"},{name: "10:00 AM", value: "10:00 AM"},{name: "10:15 AM", value: "10:15 AM"},{name: "10:30 AM", value: "10:30 AM"},{name: "10:45 AM", value: "10:45 AM"},
			{name: "11:00 AM", value: "11:00 AM"},{name: "11:15 AM", value: "11:15 AM"},{name: "11:30 AM", value: "11:30 AM"},{name: "11:45 AM", value: "11:45 AM"},
			{name: "12:00 PM", value: "12:00 PM"},{name: "12:15 PM", value: "12:15 PM"},{name: "12:30 PM", value: "12:30 PM"},{name: "12:45 PM", value: "12:45 PM"},{name: "1:00 PM", value: "1:00 PM"},
			{name: "1:15 PM", value: "1:15 PM"},{name: "1:30 PM", value: "1:30 PM"},{name: "1:45 PM", value: "1:45 PM"},{name: "2:00 PM", value: "2:00 PM"},{name: "2:15 PM", value: "2:15 PM"},{name: "2:30 PM", value: "2:30 PM"},{name: "2:45 PM", value: "2:45 PM"},{name: "3:00 PM", value: "3:00 PM"},
			{name: "3:15 PM", value: "3:15 PM"},{name: "3:30 PM", value: "3:30 PM"},{name: "3.45 PM", value: "3.45 PM"},{name: "4:00 PM", value: "4:00 PM"},{name: "4:15 PM", value: "4:15 PM"},{name: "4:30 PM", value: "4:30 PM"},
			{name: "4:45 PM", value: "4:45 PM"},{name: "5:00 PM", value: "5:00 PM"},{name: "5:15 PM", value: "5:15 PM"},{name: "5:30 PM", value: "5:30 PM"},{name: "5:45 PM", value: "5:45 PM"},{name: "6:00 PM", value: "6:00 PM"},
			{name: "6:15 PM", value: "6:15 PM"},{name: "6:30 PM", value: "6:30 PM"},{name: "6:45 PM", value: "6:45 PM"},{name: "7:00 PM", value: "7:00 PM"},{name: "7:15 PM", value: "7:15 PM"},{name: "7:30 PM", value: "7:30 PM"},
			{name: "7:45 PM", value: "7.45 PM"},{name: "8:00 PM", value: "8:00 PM"},{name: "8:15 PM", value: "8:15 PM"},{name: "8:30 PM", value: "8:30 PM"},{name: "8:45 PM", value: "8:45 PM"},
			{name: "9:00 PM", value: "9:00 PM"},{name: "9:30 PM", value: "9:30 PM"},{name: "9:45 PM", value: "9:45 PM"},{name: "10:00 PM", value: "10:00 PM"},{name: "10:15 PM", value: "10:15 PM"},{name: "10:30 PM", value: "10:30 PM"},{name: "10:45 PM", value: "10:45 PM"},
			{name: "11:00 PM", value: "11:00 PM"},{name: "11:15 PM", value: "11:15 PM"},{name: "11:30 PM", value: "11:30 PM"},{name: "11:45 PM", value: "11:45 PM"}


		]};

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