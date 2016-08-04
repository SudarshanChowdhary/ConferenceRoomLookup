'use strict'
ConferenceRoomLookup.factory("siteService", function($resource) {

    return {

        getSiteData: function() {
            var siteData = $resource('js/services/sitedata.json', {}, {
           // var siteData = $resource('http://ma-istwebd-lweb01.corp.apple.com:8888/roomlookuptool/tool/get_all/?format=json', {}, {
                'get': {
                    method: 'GET'
                }
            })
            return siteData.get().$promise
        }
    }
})