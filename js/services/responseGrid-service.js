'use strict'
ConferenceRoomLookup.factory("responseGrid", function($http) {
    return {
        getMultipleRoomsData: function(req) {
            console.log(req)
            var promise = $http({
                method: 'POST',
               // url: 'js/services/responseGrid-data.json',
                url: 'http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/api/freebusyrooms/?format=json',
                data: req,
                 headers: {'Content-Type': 'application/json'}
            });
            return promise;
        },
        getSingleRoomData: function(req) {
            console.log(req)
            var promise = $http({
                method: 'POST',
               // url: 'js/services/singleRoom-data.json',
                url: 'http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/api/lookupbyroom/?format=json',
                data: JSON.stringify(req),
                headers: {'Content-Type': 'application/json'}
            });
            return promise;
        },
        getNearByRoomData: function(req) {
            console.log(req)
            var promise = $http({
                method: 'POST',
                //url: 'js/services/nearbybuilding.json',
                url: 'http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/api/nearbybuildings/?format=json',
                data: req,
                 headers: {'Content-Type': 'application/json'}
            });
            return promise;
        }
    }
});
