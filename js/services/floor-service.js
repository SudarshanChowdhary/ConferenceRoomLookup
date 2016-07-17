'use strict'
ConferenceRoomLookup.factory("floorService", function($resource) {
        return $resource('js/services/floordata.json', {}, {
            'get': {
                method: 'GET'
            }
        })
    }
)