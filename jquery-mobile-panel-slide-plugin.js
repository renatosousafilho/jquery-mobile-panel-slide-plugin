	$( document ).on( "pageinit", "#demo-page" , function() {
var mouseEventTypes = {
        touchstart : "mousedown",
        touchmove : "mousemove",
        touchend : "mouseup"
    };

    for (originalType in mouseEventTypes) {
        document.addEventListener(originalType, function(originalEvent) {
            if(originalEvent.type == 'click')
                return;
            if (originalEvent.type != 'touchstart' && originalEvent.type !='touchend'){
                originalEvent.preventDefault();
            }
            event = document.createEvent("MouseEvents");
            touch = originalEvent.changedTouches[0];
            event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true, window, 0, touch.screenX, touch.screenY, touch.clientX, touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey, touch.metaKey, 0, null);
            originalEvent.target.dispatchEvent(event);
            event.preventDefault();         
        });
    }
    
   $.props = {
    originalPosition: '272px'
  }
  $(".ui-panel-content-wrap").on('swipeleft', function(e){
  });

  $(".ui-panel-content-wrap").on('swiperight', function(e){
  });

  $(".ui-panel").on('panelbeforeopen',function(e, ui){
    var position = $( e.target ).panel( "option", "position" );
    $.props.position = position;
    var originalPosition = parseInt($.props.originalPosition);
    if (position=="right") {
      originalPosition = originalPosition * -1;
    }
    $('.ui-panel-content-wrap').css('left', originalPosition);
  });
});


  $.event.special.swipe.stop = function( event ) {
    event.preventDefault();
    var data = event.originalEvent.touches ?
    event.originalEvent.touches[ 0 ] : event;
    // var less = event.originalEvent.webkitMovementX;
    var less = event.originalEvent.movementX       ||
                  event.originalEvent.mozMovementX    ||
                  event.originalEvent.webkitMovementX ||
                  0;
    // window.alert(event.originalEvent.movementX);
    // window.alert(event.originalEvent.mozMovementX);
    if ($.props.position == 'right') { 
      less = less * (-1);
      if (less<0){
        $('.ui-panel-content-wrap').css('left',"-=" + less);
      }
    } else {

      if (less<0) {
       $('.ui-panel-content-wrap').css('left',"+=" +less);
     }
   }
   
   return {
     time: ( new Date()).getTime(),
     coords: [data.pageX, data.pageY]
   }
   
 }

 $.event.special.swipe.handleSwipe = function(start, stop){
   if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
     Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
     Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {

     start.origin.trigger( "swipe" )
   .trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
 }
 currentPosition = parseInt($('.ui-panel-content-wrap').css('left'));
 originalPosition = parseInt($.props.originalPosition);
 if (Math.abs(currentPosition) < (originalPosition/2)) {
  $(".ui-panel").panel('close');
} else {
  if ($.props.position == "right") { originalPosition = ( originalPosition * (-1) )}
   $('.ui-panel-content-wrap').css('left', originalPosition);
}
}