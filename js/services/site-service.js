'use strict'
ConferenceRoomLookup.factory("siteService", function($resource) {

    return {

        getSiteData: function() {
            // if(siteData){
                
            // }
                 var siteData = $resource('js/services/sitedata.json', {}, {
                // var siteData = $resource('http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/api/allrooms/?format=json', {}, {
                'get': {
                    method: 'GET'
                }
            })
            return siteData.get().$promise
        }
    }
})