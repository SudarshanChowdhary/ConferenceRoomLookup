'use strict'
ConferenceRoomLookup.factory("nearybybuilding-Service", function($resource) {
        return $resource('js/services/nearybybuildingdata.json', {}, {
            'get': {
                method: 'GET'
            }
        })
    }
)