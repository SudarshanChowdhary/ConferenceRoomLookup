'use strict'
ConferenceRoomLookup.factory("siteService", function($resource) {

    return {

        getSiteData: function() {
            var siteData = $resource('js/services/sitedata.json', {}, {
                'get': {
                    method: 'GET'
                }
            })
            return siteData.get().$promise
        }
    }
})