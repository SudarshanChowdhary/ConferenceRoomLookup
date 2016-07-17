'use strict'
ConferenceRoomLookup.factory("siteService", function($resource) {
        return $resource('js/services/sitedata.json', {}, {
            'get': {
                method: 'GET'
            }
        })
    }
)