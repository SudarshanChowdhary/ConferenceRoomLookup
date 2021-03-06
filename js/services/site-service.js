'use strict'
ConferenceRoomLookup.factory("siteService", function($resource) {
    return {
        getSiteData: function() {
                var siteData = $resource('http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/api/allrooms/?format=json', {}, {
                'get': {
                    method: 'GET',
                    cache:true
                }
            })
            return siteData.get().$promise
        }
    }
})
