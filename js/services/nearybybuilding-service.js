'use strict'
ConferenceRoomLookup.factory("buildingService", function($resource) {
        return $resource('js/services/buildingdata.json', {}, {
            'get': {
                method: 'GET'
            }
        })
    }
)