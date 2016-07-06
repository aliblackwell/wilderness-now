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


$(function() {

  setTimeout(function() {
    openActivitiesPrompt()
  }, 8000);

  $('.encourage-activities-click .no-thanks').on('click', function(){
    closeActivitiesPrompt();
  });

});

