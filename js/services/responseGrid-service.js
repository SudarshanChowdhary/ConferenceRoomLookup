'use strict'
ConferenceRoomLookup.factory("responseGrid", function($resource, $q, $http, $log) {
    return {
        getResponseGridData: function(searchFormData) {
            console.log("service search form data : ", searchFormData)
            var siteData = $resource('js/services/responseGrid-data.json', searchFormData, {
                'search': {
                    method: 'POST'
                }
            })
            return siteData.search().$promise
        },
        getResponseGridData2: function(searchFormData) {

            console.log(searchFormData);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'js/services/responseGrid-data.json',
                data: searchFormData,
                headers: {
                    'Content-Type': 'application/json, text/plain, */*'
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });
            return deferred.promise;
        },

        getResponseGridData6: function(searchFormData) {
            console.log(searchFormData)
            var promise = $http({
                method: 'GET',
                url: 'js/services/responseGrid-data.json',
               // url: 'http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/tool/get_rooms_search/',
                data: searchFormData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return promise;
        }
    }
});