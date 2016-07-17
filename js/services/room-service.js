'use strict'
ConferenceRoomLookup.factory("roomService", function($resource) {
        return $resource('js/services/roomdata.json', {}, {
            'get': {
                method: 'GET'
            }
        })
    }
)