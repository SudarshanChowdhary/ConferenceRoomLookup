alert("hi");
/*
checkin.js
@description: behaviors for checkin dashboard, for facilities building managers to get a high-level view of checkin room usage
@author: greg doolittle, 04/15/2015
*/
var dashboard = {
    showInfo : function( el ) {
        $('a.close-button').click();
        jQuery( el ).parent().parent().children(".info-content").addClass( "scrolledUp" );
        jQuery( el ).parent().children(".info-button").hide();

        return false;
    },
    hideInfo : function( el ) {
    	
        console.log( jQuery( el ).parent().parent().parent().children(".info").children(".info-button").show() );
        jQuery( el ).parent().children(".info").children(".info-button").show();
        jQuery( el ).parent().parent().removeClass( "scrolledUp" );
        return false;
    },
    showDeleteFavoriteIcon: function(el) {    	
    	if($(el).html() == "[Edit]") {
    		$('#navbar ul li span.glyphicon-minus-sign').show();
        	$(el).html('[Done]');
    	} else {
    		$('#navbar ul li span.glyphicon-minus-sign').hide();
        	$(el).html('[Edit]');
    	}
    },
   /* init: function() {
    	$('#date-container .input-daterange').datepicker({
    		 	format: 'mm/dd/yyyy',
                clearBtn: true,
                todayHighlight: true,
                endDate: '-1d',
                autoclose: true,
                todayHighlight:false
        });*/
       $('a.open-button').click(function(e) {
            e.preventDefault();
            dashboard.showInfo(this);
        });
        $('a.close-button').click(function(e) {
            e.preventDefault();
            dashboard.hideInfo(this);
        });
        $('#navbar ul li span.glyphicon-minus-sign').hide();
    },
    scrollToTop: function() {
    	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    	element = $('body');
    	offset = element.offset();
    	offsetTop = offset.top;
    	$('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
    },
    filterByCampus: function(identifier) {
    	this.scrollToTop();
    	var campusId = $(identifier).data('id').toString();
    	$('#campus').val(campusId);
    	angular.element('#roomLookupController').scope().selectedCampus = campusId;
    	angular.element('#roomLookupController').scope().getCampusDetails(campusId);
    },
    filterByBuilding: function(identifier) {
    	this.scrollToTop();
    	var buildingId = $(identifier).data('id').toString();
    	$('#building').val(buildingId);
    	angular.element('#roomLookupController').scope().selectedBuilding = buildingId;
    	angular.element('#roomLookupController').scope().getBuildingDetails(buildingId);
    },
    filterByRoom: function(identifier) {
    	this.scrollToTop();
    	var roomId = $(identifier).data('id').toString();
    	$('#room').val(roomId);
    	angular.element('#roomLookupController').scope().selectedRoom = roomId;
    	angular.element('#roomLookupController').scope().getRoomDetails(roomId);
    }
};
dashboard.init();