'use strict'
ConferenceRoomLookup.factory("responseGrid", function($resource, $q, $http, $log, $httpParamSerializer) {
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
                method: 'POST',
                url: 'js/services/responseGrid-data.json',
               // url: 'http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/tool/get_rooms_search/',
                data: searchFormData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return promise;
        },

        getMinutesPerDay: function() {
            return [{
                "time": "00:00:00"
            }, {
                "time": "00:15:00"
            }, {
                "time": "00:30:00"
            }, {
                "time": "00:45:00"
            }, {
                "time": "01:00:00"
            }, {
                "time": "01:15:00"
            }, {
                "time": "01:30:00"
            }, {
                "time": "01:45:00"
            }, {
                "time": "02:00:00"
            }, {
                "time": "02:15:00"
            }, {
                "time": "02:30:00"
            }, {
                "time": "02:45:00"
            }, {
                "time": "03:00:00"
            }, {
                "time": "03:15:00"
            }, {
                "time": "03:30:00"
            }, {
                "time": "03:45:00"
            }, {
                "time": "04:00:00"
            }, {
                "time": "04:15:00"
            }, {
                "time": "04:30:00"
            }, {
                "time": "04:45:00"
            }, {
                "time": "05:00:00"
            }, {
                "time": "05:15:00"
            }, {
                "time": "05:30:00"
            }, {
                "time": "05:45:00"
            }, {
                "time": "06:00:00"
            }, {
                "time": "00:15:00"
            }, {
                "time": "06:30:00"
            }, {
                "time": "06:45:00"
            }, {
                "time": "07:00:00"
            }, {
                "time": "07:15:00"
            }, {
                "time": "07:30:00"
            }, {
                "time": "07:45:00"
            }, {
                "time": "08:00:00"
            }, {
                "time": "08:15:00"
            }, {
                "time": "08:30:00"
            }, {
                "time": "08:45:00"
            }, {
                "time": "09:00:00"
            }, {
                "time": "09:15:00"
            }, {
                "time": "09:30:00"
            }, {
                "time": "09:45:00"
            }, {
                "time": "10:00:00"
            }, {
                "time": "10:15:00"
            }, {
                "time": "10:30:00"
            }, {
                "time": "10:45:00"
            }, {
                "time": "11:00:00"
            }, {
                "time": "11:15:00"
            }, {
                "time": "11:30:00"
            }, {
                "time": "11:45:00"
            }, {
                "time": "12:00:00"
            }, {
                "time": "12:15:00"
            }, {
                "time": "12:30:00"
            }, {
                "time": "12:45:00"
            }, {
                "time": "13:00:00"
            }, {
                "time": "13:15:00"
            }, {
                "time": "13:30:00"
            }, {
                "time": "13:45:00"
            }, {
                "time": "14:00:00"
            }, {
                "time": "14:15:00"
            }, {
                "time": "14:30:00"
            }, {
                "time": "14:45:00"
            }, {
                "time": "15:00:00"
            }, {
                "time": "15:15:00"
            }, {
                "time": "15:30:00"
            }, {
                "time": "15:45:00"
            }, {
                "time": "16:00:00"
            }, {
                "time": "16:15:00"
            }, {
                "time": "16:30:00"
            }, {
                "time": "16:45:00"
            }, {
                "time": "17:00:00"
            }, {
                "time": "17:15:00"
            }, {
                "time": "17:30:00"
            }, {
                "time": "17:45:00"
            }, {
                "time": "18:00:00"
            }, {
                "time": "18:15:00"
            }, {
                "time": "18:30:00"
            }, {
                "time": "18:45:00"
            }, {
                "time": "19:00:00"
            }, {
                "time": "19:15:00"
            }, {
                "time": "19:30:00"
            }, {
                "time": "19:45:00"
            }, {
                "time": "20:00:00"
            }, {
                "time": "20:15:00"
            }, {
                "time": "20:30:00"
            }, {
                "time": "20:45:00"
            }, {
                "time": "21:00:00"
            }, {
                "time": "21:15:00"
            }, {
                "time": "21:30:00"
            }, {
                "time": "21:45:00"
            }, {
                "time": "22:00:00"
            }, {
                "time": "22:15:00"
            }, {
                "time": "22:30:00"
            }, {
                "time": "22:45:00"
            }, {
                "time": "23:00:00"
            }, {
                "time": "23:15:00"
            }, {
                "time": "23:30:00"
            }, {
                "time": "23:45:00"
            }]

        }
    }
});