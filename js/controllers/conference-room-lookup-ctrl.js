'use strict'
ConferenceRoomLookup.controller("ConferenceRoom", function($scope, $http, services){
	//alert("controller")
    $http.get('package.json').success(function (data)
    {
        $scope.testAccounts = data;
        $scope.selectedTestAccount = $scope.testAccounts[0];
    });

})