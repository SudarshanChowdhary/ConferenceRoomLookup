'use strict'
ConferenceRoomLookup.factory("timeRangeService", function() {
    return {
        getFromTimeOptions: function() {
            return [
                              "00:00:00",
                              "00:15:00",
                              "00:30:00",
                              "00:45:00",
                              "1:00:00",
                              "1:15:00",
                              "1:30:00",
                              "1:45:00",
                              "2:00:00",
                              "2:15:00",
                              "2:30:00",
                              "2:45:00",
                              "3:00:00",
                              "3:15:00",
                              "3:30:00",
                              "3.45:00",
                              "4:00:00",
                              "4:15:00",
                              "4:30:00",
                              "4:45:00",
                              "5:00:00",
                              "5:15:00",
                              "5:30:00",
                              "5:45:00",
                              "6:00:00",
                              "6:15:00",
                              "6:30:00",
                              "6:45:00",
                              "7:00:00",
                              "7:15:00",
                              "7:30:00",
                              "7:45:00",
                              "8:00:00",
                              "8:15:00",
                              "8:30:00",
                              "8:45:00",
                              "9:00:00",                              
                              "9:15:00",
                              "9:30:00",
                              "9:45:00",
                              "10:00:00",
                              "10:15:00",
                              "10:30:00",
                              "10:45:00",
                              "11:00:00",
                              "11:15:00",
                              "11:30:00",
                              "11:45:00",
                              "12:00:00",
                              "12:15:00",
                              "12:30:00",
                              "12:45:00",
                              "13:00:00",
                              "13:15:00",
                              "13:30:00",
                              "13:45:00",
                              "14:00:00",
                              "14:15:00",
                              "14:30:00",
                              "14:45:00",
                              "15:00:00",
                              "15:15:00",
                              "15:30:00",
                              "15.45:00",
                              "16:00:00",
                              "16:15:00",
                              "16:30:00",
                              "16:45:00",
                              "17:00:00",
                              "17:15:00",
                              "17:30:00",
                              "17:45:00",
                              "18:00:00",
                              "18:15:00",
                              "18:30:00",
                              "18:45:00",
                              "19:00:00",
                              "19:15:00",
                              "19:30:00",
                              "19:45:00",
                              "20:00:00",
                              "20:15:00",
                              "20:30:00",
                              "20:45:00",
                              "21:00:00",
                              "21:30:00",
                              "21:45:00",
                              "22:00:00",
                              "22:15:00",
                              "22:30:00",
                              "22:45:00",
                              "23:00:00",
                              "23:15:00",
                              "23:30:00",
                              "23:45:00"
  
                            ];
        },
        getToTimeOptions:function(index){
            var toTimeOptions= [
                              "00:00:00",
                              "00:15:00",
                              "00:30:00",
                              "00:45:00",
                              "1:00:00",
                              "1:15:00",
                              "1:30:00",
                              "1:45:00",
                              "2:00:00",
                              "2:15:00",
                              "2:30:00",
                              "2:45:00",
                              "3:00:00",
                              "3:15:00",
                              "3:30:00",
                              "3.45:00",
                              "4:00:00",
                              "4:15:00",
                              "4:30:00",
                              "4:45:00",
                              "5:00:00",
                              "5:15:00",
                              "5:30:00",
                              "5:45:00",
                              "6:00:00",
                              "6:15:00",
                              "6:30:00",
                              "6:45:00",
                              "7:00:00",
                              "7:15:00",
                              "7:30:00",
                              "7:45:00",
                              "8:00:00",
                              "8:15:00",
                              "8:30:00",
                              "8:45:00",
                              "9:00:00",                              
                              "9:15:00",
                              "9:30:00",
                              "9:45:00",
                              "10:00:00",
                              "10:15:00",
                              "10:30:00",
                              "10:45:00",
                              "11:00:00",
                              "11:15:00",
                              "11:30:00",
                              "11:45:00",
                              "12:00:00",
                              "12:15:00",
                              "12:30:00",
                              "12:45:00",
                              "13:00:00",
                              "13:15:00",
                              "13:30:00",
                              "13:45:00",
                              "14:00:00",
                              "14:15:00",
                              "14:30:00",
                              "14:45:00",
                              "15:00:00",
                              "15:15:00",
                              "15:30:00",
                              "15.45:00",
                              "16:00:00",
                              "16:15:00",
                              "16:30:00",
                              "16:45:00",
                              "17:00:00",
                              "17:15:00",
                              "17:30:00",
                              "17:45:00",
                              "18:00:00",
                              "18:15:00",
                              "18:30:00",
                              "18:45:00",
                              "19:00:00",
                              "19:15:00",
                              "19:30:00",
                              "19:45:00",
                              "20:00:00",
                              "20:15:00",
                              "20:30:00",
                              "20:45:00",
                              "21:00:00",
                              "21:30:00",
                              "21:45:00",
                              "22:00:00",
                              "22:15:00",
                              "22:30:00",
                              "22:45:00",
                              "23:00:00",
                              "23:15:00",
                              "23:30:00",
                              "23:45:00"
                            ];
            return toTimeOptions;                          
//            return toTimeOptions.slice(index);                          
        }
    }
});