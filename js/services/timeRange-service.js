'use strict'
ConferenceRoomLookup.factory("timeRangeService", function() {
    return {
        getFromTimeOptions: function() {
            return [{
                name: "12:00 AM",
                value: "12:00 AM",
                id: 0
            }, {
                name: "12:15 AM",
                value: "12:15 AM"
            }, {
                name: "12:30 AM",
                value: "12:30 AM"
            }, {
                name: "12:45 AM",
                value: "12:45 AM"
            }, {
                name: "1:00 AM",
                value: "1:00 AM"
            }, {
                name: "1:15 AM",
                value: "1:15 AM"
            }, {
                name: "1:30 AM",
                value: "1:30 AM"
            }, {
                name: "1:45 AM",
                value: "1:45 AM"
            }, {
                name: "2:00 AM",
                value: "2:00 AM"
            }, {
                name: "2:15 AM",
                value: "2:15 AM"
            }, {
                name: "2:30 AM",
                value: "2:30 AM"
            }, {
                name: "2:45 AM",
                value: "2:45 AM"
            }, {
                name: "3:00 AM",
                value: "3:00 AM"
            }, {
                name: "3:15 AM",
                value: "3:15 AM"
            }, {
                name: "3:30 AM",
                value: "3:30 AM"
            }, {
                name: "3.45 AM",
                value: "3.45 AM"
            }, {
                name: "4:00 AM",
                value: "4:00 AM"
            }, {
                name: "4:15 AM",
                value: "4:15 AM"
            }, {
                name: "4:30 AM",
                value: "4:30 AM"
            }, {
                name: "4:45 AM",
                value: "4:45 AM"
            }, {
                name: "5:00 AM",
                value: "5:00 AM"
            }, {
                name: "5:15 AM",
                value: "5:15 AM"
            }, {
                name: "5:30 AM",
                value: "5:30 AM"
            }, {
                name: "5:45 AM",
                value: "5:45 AM"
            }, {
                name: "6:00 AM",
                value: "6:00 AM"
            }, {
                name: "6:15 AM",
                value: "6:15 AM"
            }, {
                name: "6:30 AM",
                value: "6:30 AM"
            }, {
                name: "6:45 AM",
                value: "6:45 AM"
            }, {
                name: "7:00 AM",
                value: "7:00 AM"
            }, {
                name: "7:15 AM",
                value: "7:15 AM"
            }, {
                name: "7:30 AM",
                value: "7:30 AM"
            }, {
                name: "7:45 AM",
                value: "7.45 AM"
            }, {
                name: "8:00 AM",
                value: "8:00 AM"
            }, {
                name: "8:15 AM",
                value: "8:15 AM"
            }, {
                name: "8:30 AM",
                value: "8:30 AM"
            }, {
                name: "8:45 AM",
                value: "8:45 AM"
            }, {
                name: "9:00 AM",
                value: "9:00 AM"
            }, {
                name: "9:30 AM",
                value: "9:30 AM"
            }, {
                name: "9:45 AM",
                value: "9:45 AM"
            }, {
                name: "10:00 AM",
                value: "10:00 AM"
            }, {
                name: "10:15 AM",
                value: "10:15 AM"
            }, {
                name: "10:30 AM",
                value: "10:30 AM"
            }, {
                name: "10:45 AM",
                value: "10:45 AM"
            }, {
                name: "11:00 AM",
                value: "11:00 AM"
            }, {
                name: "11:15 AM",
                value: "11:15 AM"
            }, {
                name: "11:30 AM",
                value: "11:30 AM"
            }, {
                name: "11:45 AM",
                value: "11:45 AM"
            }, {
                name: "12:00 PM",
                value: "12:00 PM"
            }, {
                name: "12:15 PM",
                value: "12:15 PM"
            }, {
                name: "12:30 PM",
                value: "12:30 PM"
            }, {
                name: "12:45 PM",
                value: "12:45 PM"
            }, {
                name: "1:00 PM",
                value: "1:00 PM"
            }, {
                name: "1:15 PM",
                value: "1:15 PM"
            }, {
                name: "1:30 PM",
                value: "1:30 PM"
            }, {
                name: "1:45 PM",
                value: "1:45 PM"
            }, {
                name: "2:00 PM",
                value: "2:00 PM"
            }, {
                name: "2:15 PM",
                value: "2:15 PM"
            }, {
                name: "2:30 PM",
                value: "2:30 PM"
            }, {
                name: "2:45 PM",
                value: "2:45 PM"
            }, {
                name: "3:00 PM",
                value: "3:00 PM"
            }, {
                name: "3:15 PM",
                value: "3:15 PM"
            }, {
                name: "3:30 PM",
                value: "3:30 PM"
            }, {
                name: "3.45 PM",
                value: "3.45 PM"
            }, {
                name: "4:00 PM",
                value: "4:00 PM"
            }, {
                name: "4:15 PM",
                value: "4:15 PM"
            }, {
                name: "4:30 PM",
                value: "4:30 PM"
            }, {
                name: "4:45 PM",
                value: "4:45 PM"
            }, {
                name: "5:00 PM",
                value: "5:00 PM"
            }, {
                name: "5:15 PM",
                value: "5:15 PM"
            }, {
                name: "5:30 PM",
                value: "5:30 PM"
            }, {
                name: "5:45 PM",
                value: "5:45 PM"
            }, {
                name: "6:00 PM",
                value: "6:00 PM"
            }, {
                name: "6:15 PM",
                value: "6:15 PM"
            }, {
                name: "6:30 PM",
                value: "6:30 PM"
            }, {
                name: "6:45 PM",
                value: "6:45 PM"
            }, {
                name: "7:00 PM",
                value: "7:00 PM"
            }, {
                name: "7:15 PM",
                value: "7:15 PM"
            }, {
                name: "7:30 PM",
                value: "7:30 PM"
            }, {
                name: "7:45 PM",
                value: "7.45 PM"
            }, {
                name: "8:00 PM",
                value: "8:00 PM"
            }, {
                name: "8:15 PM",
                value: "8:15 PM"
            }, {
                name: "8:30 PM",
                value: "8:30 PM"
            }, {
                name: "8:45 PM",
                value: "8:45 PM"
            }, {
                name: "9:00 PM",
                value: "9:00 PM"
            }, {
                name: "9:30 PM",
                value: "9:30 PM"
            }, {
                name: "9:45 PM",
                value: "9:45 PM"
            }, {
                name: "10:00 PM",
                value: "10:00 PM"
            }, {
                name: "10:15 PM",
                value: "10:15 PM"
            }, {
                name: "10:30 PM",
                value: "10:30 PM"
            }, {
                name: "10:45 PM",
                value: "10:45 PM"
            }, {
                name: "11:00 PM",
                value: "11:00 PM"
            }, {
                name: "11:15 PM",
                value: "11:15 PM"
            }, {
                name: "11:30 PM",
                value: "11:30 PM"
            }, {
                name: "11:45 PM",
                value: "11:45 PM"
            }];

        },
        getToTimeOptions:function(){
            //ToDo: Logic to show only greater values from From Time.
            return [{
                name: "12:00 AM",
                value: "12:00 AM",
                id: 0
            }, {
                name: "12:15 AM",
                value: "12:15 AM"
            }, {
                name: "12:30 AM",
                value: "12:30 AM"
            }, {
                name: "12:45 AM",
                value: "12:45 AM"
            }, {
                name: "1:00 AM",
                value: "1:00 AM"
            }, {
                name: "1:15 AM",
                value: "1:15 AM"
            }, {
                name: "1:30 AM",
                value: "1:30 AM"
            }, {
                name: "1:45 AM",
                value: "1:45 AM"
            }, {
                name: "2:00 AM",
                value: "2:00 AM"
            }, {
                name: "2:15 AM",
                value: "2:15 AM"
            }, {
                name: "2:30 AM",
                value: "2:30 AM"
            }, {
                name: "2:45 AM",
                value: "2:45 AM"
            }, {
                name: "3:00 AM",
                value: "3:00 AM"
            }, {
                name: "3:15 AM",
                value: "3:15 AM"
            }, {
                name: "3:30 AM",
                value: "3:30 AM"
            }, {
                name: "3.45 AM",
                value: "3.45 AM"
            }, {
                name: "4:00 AM",
                value: "4:00 AM"
            }, {
                name: "4:15 AM",
                value: "4:15 AM"
            }, {
                name: "4:30 AM",
                value: "4:30 AM"
            }, {
                name: "4:45 AM",
                value: "4:45 AM"
            }, {
                name: "5:00 AM",
                value: "5:00 AM"
            }, {
                name: "5:15 AM",
                value: "5:15 AM"
            }, {
                name: "5:30 AM",
                value: "5:30 AM"
            }, {
                name: "5:45 AM",
                value: "5:45 AM"
            }, {
                name: "6:00 AM",
                value: "6:00 AM"
            }, {
                name: "6:15 AM",
                value: "6:15 AM"
            }, {
                name: "6:30 AM",
                value: "6:30 AM"
            }, {
                name: "6:45 AM",
                value: "6:45 AM"
            }, {
                name: "7:00 AM",
                value: "7:00 AM"
            }, {
                name: "7:15 AM",
                value: "7:15 AM"
            }, {
                name: "7:30 AM",
                value: "7:30 AM"
            }, {
                name: "7:45 AM",
                value: "7.45 AM"
            }, {
                name: "8:00 AM",
                value: "8:00 AM"
            }, {
                name: "8:15 AM",
                value: "8:15 AM"
            }, {
                name: "8:30 AM",
                value: "8:30 AM"
            }, {
                name: "8:45 AM",
                value: "8:45 AM"
            }, {
                name: "9:00 AM",
                value: "9:00 AM"
            }, {
                name: "9:30 AM",
                value: "9:30 AM"
            }, {
                name: "9:45 AM",
                value: "9:45 AM"
            }, {
                name: "10:00 AM",
                value: "10:00 AM"
            }, {
                name: "10:15 AM",
                value: "10:15 AM"
            }, {
                name: "10:30 AM",
                value: "10:30 AM"
            }, {
                name: "10:45 AM",
                value: "10:45 AM"
            }, {
                name: "11:00 AM",
                value: "11:00 AM"
            }, {
                name: "11:15 AM",
                value: "11:15 AM"
            }, {
                name: "11:30 AM",
                value: "11:30 AM"
            }, {
                name: "11:45 AM",
                value: "11:45 AM"
            }, {
                name: "12:00 PM",
                value: "12:00 PM"
            }, {
                name: "12:15 PM",
                value: "12:15 PM"
            }, {
                name: "12:30 PM",
                value: "12:30 PM"
            }, {
                name: "12:45 PM",
                value: "12:45 PM"
            }, {
                name: "1:00 PM",
                value: "1:00 PM"
            }, {
                name: "1:15 PM",
                value: "1:15 PM"
            }, {
                name: "1:30 PM",
                value: "1:30 PM"
            }, {
                name: "1:45 PM",
                value: "1:45 PM"
            }, {
                name: "2:00 PM",
                value: "2:00 PM"
            }, {
                name: "2:15 PM",
                value: "2:15 PM"
            }, {
                name: "2:30 PM",
                value: "2:30 PM"
            }, {
                name: "2:45 PM",
                value: "2:45 PM"
            }, {
                name: "3:00 PM",
                value: "3:00 PM"
            }, {
                name: "3:15 PM",
                value: "3:15 PM"
            }, {
                name: "3:30 PM",
                value: "3:30 PM"
            }, {
                name: "3.45 PM",
                value: "3.45 PM"
            }, {
                name: "4:00 PM",
                value: "4:00 PM"
            }, {
                name: "4:15 PM",
                value: "4:15 PM"
            }, {
                name: "4:30 PM",
                value: "4:30 PM"
            }, {
                name: "4:45 PM",
                value: "4:45 PM"
            }, {
                name: "5:00 PM",
                value: "5:00 PM"
            }, {
                name: "5:15 PM",
                value: "5:15 PM"
            }, {
                name: "5:30 PM",
                value: "5:30 PM"
            }, {
                name: "5:45 PM",
                value: "5:45 PM"
            }, {
                name: "6:00 PM",
                value: "6:00 PM"
            }, {
                name: "6:15 PM",
                value: "6:15 PM"
            }, {
                name: "6:30 PM",
                value: "6:30 PM"
            }, {
                name: "6:45 PM",
                value: "6:45 PM"
            }, {
                name: "7:00 PM",
                value: "7:00 PM"
            }, {
                name: "7:15 PM",
                value: "7:15 PM"
            }, {
                name: "7:30 PM",
                value: "7:30 PM"
            }, {
                name: "7:45 PM",
                value: "7.45 PM"
            }, {
                name: "8:00 PM",
                value: "8:00 PM"
            }, {
                name: "8:15 PM",
                value: "8:15 PM"
            }, {
                name: "8:30 PM",
                value: "8:30 PM"
            }, {
                name: "8:45 PM",
                value: "8:45 PM"
            }, {
                name: "9:00 PM",
                value: "9:00 PM"
            }, {
                name: "9:30 PM",
                value: "9:30 PM"
            }, {
                name: "9:45 PM",
                value: "9:45 PM"
            }, {
                name: "10:00 PM",
                value: "10:00 PM"
            }, {
                name: "10:15 PM",
                value: "10:15 PM"
            }, {
                name: "10:30 PM",
                value: "10:30 PM"
            }, {
                name: "10:45 PM",
                value: "10:45 PM"
            }, {
                name: "11:00 PM",
                value: "11:00 PM"
            }, {
                name: "11:15 PM",
                value: "11:15 PM"
            }, {
                name: "11:30 PM",
                value: "11:30 PM"
            }, {
                name: "11:45 PM",
                value: "11:45 PM"
            }];

        }
    }
});