'use strict'
ConferenceRoomLookup.factory("timeRangeService", function() {

   var values = ["00", "15", "30","45"];
 //  var times = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
   var timeOptions = [];


for (var j = 0; j < 23; j++) {
      for (var i = 0; i < values.length; i++) {
         if (j < 12) {
            //var display = j == 0 ? "12" : times[j];
            var value = j <10 ? "0"+""+j : j;
            if(j == 0)
               value = "12";

            timeOptions.push({name: value + ":" + values[i] + " AM", value: value + ":" + values[i] + ":00"});
         } else {

            var value = j-12;
            if (value == 0)
               value = "12";
            if(value < 10) {
               value ="0"+value;
            }
            timeOptions.push({name: value  + ":" + values[i] + " PM", value: j + ":" + values[i] + ":00"});
         }
      }
    }
   

   
    // for (var j = 0; j < times.length; j++) {
    //   for (var i = 0; i < values.length; i++) {
    //      if (times[j] < 12) {
    //         //var display = times[j] == 0 ? "12" : times[j];
    //         var value = times[j] <10 ? "0"+""+times[j] : times[j];
    //         if(times[j] == 0)
    //            value = "12";

    //         timeOptions.push({name: value + ":" + values[i] + " AM", value: value + ":" + values[i] + ":00"});
    //      } else {

    //         var value = times[j]-12;
    //         if (value == 0)
    //            value = "12";
    //         if(value < 10) {
    //            value ="0"+value;
    //         }
    //         timeOptions.push({name: value  + ":" + values[i] + " PM", value: times[j] + ":" + values[i] + ":00"});
    //      }
    //   }
    // }
   
   //console.log(timeOptions);

   

    return {      
        getFromTimeOptions: function() {
            return timeOptions;
        },
        getToTimeOptions:function(index){
            
            return timeOptions;                          
//            return toTimeOptions.slice(index);                          
        }
    }
});