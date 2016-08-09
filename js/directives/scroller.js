ConferenceRoomLookup.directive('scroller', function($timeout) {
  return {
    // Restrict it to be an attribute in this case
    restrict: 'A',
    // responsible for registering DOM listeners as well as updating the DOM
    link: function(scope, element, attrs) {
      var column= element.find("#9AM").offset().left;
      console.log(column)
alert(column)
      $timeout(function() {
        element.animate({ scrollLeft:column  }, 800, function() { });
      }, 1);
    }
  };
});