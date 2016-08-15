/*

  Runs on Activities Page
  Asks user for their email address after five seconds

*/

var openActivitiesPrompt = function() {
  $('.encourage-activities-click').animate({
    'bottom': '0rem'
  }, 'fast', 'easeInOutCubic');
}

var closeActivitiesPrompt = function() {
  $('.encourage-activities-click').animate({
    'bottom': '-200px'
  }, 'fast', 'easeInOutCubic', function() {
  });
}

var launchActivitiesPrompt = function() {
  setTimeout(function() {
    if ($('body').hasClass('an-overlay-open') != true) {
      openActivitiesPrompt()
    } else {
      launchActivitiesPrompt();
    }
  }, 8000);
}


$(function() {

  launchActivitiesPrompt();

  $('.encourage-activities-click .no-thanks').on('click', function(){
    closeActivitiesPrompt();
  });

});

