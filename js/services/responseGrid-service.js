'use strict'
ConferenceRoomLookup.factory("responseGrid", function($http) {
    return {
        getMultipleRoomsData: function(req) {
            console.log(req)
            var promise = $http({
                method: 'GET',
                url: 'js/services/responseGrid-data.json',
               // url: 'http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/tool/get_rooms_search/',
                data: req,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return promise;
        },
        getSingleRoomData: function(req) {
            console.log(req)
            var promise = $http({
                method: 'GET',
                url: 'js/services/singleRoom-data.json',
               // url: 'http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/tool/get_rooms_search/',
                data: req,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return promise;
        },
        getNearByRoomData: function(req) {
            console.log(req)
            var promise = $http({
                method: 'GET',
                url: 'js/services/responseGrid-data.json',
               // url: 'http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/tool/get_rooms_search/',
                data: req,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return promise;
        }
    }
});
