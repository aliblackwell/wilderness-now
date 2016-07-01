/*

  Runs on Activities Page
  Asks user for their email address after five seconds

*/

var askedForEmail, seenAskForEmail, timeToAsk;

var processFailedResponse = function() {
  localStorage.setItem('askedForEmail', true);
}

var processEmailResponse = function(email) {
  localStorage.setItem('askedForEmail', true);
}

var openEmailCapture = function(time) {
  if (time === 0) {
    openEmailCaptureNoAnimation();
  } else {
    openEmailCaptureAnimated();
  }
}

var openEmailCaptureAnimated = function() {
  setSeenAsk();
  $('.capture-email').animate({
    'bottom': '0rem'
  }, 'fast', 'easeInOutCubic', function() {
    setTimeout(function() {
      $('.ask-consent .btn-primary').fadeIn();
      setTimeout(function() {
        $('.ask-consent .no-thanks').fadeIn();
      }, 1000)
    }, 1000);
  });
}

var openEmailCaptureNoAnimation = function() {
  $('.ask-consent .btn-primary, .ask-consent .no-thanks').show();
  $('.capture-email').css('bottom', '0rem');
}

var openSecondSection = function() {
  $('.ask-consent').fadeOut(function(){
    $('.ask-email').fadeIn();
  })
}

var closeEmailCapture = function() {
  $('.capture-email').animate({
    'bottom': '-200px'
  }, 'fast', 'easeInOutCubic');
}

var setSeenAsk = function() {
  localStorage.setItem('seenAskForEmail', true);
}

var setDismissedAsk = function() {
  localStorage.setItem('askedForEmail', true);
}

var processSubmittedEmail = function() {
  setDismissedAsk();
}


$(function() {
  askedForEmail = localStorage.getItem('askedForEmail');
  seenAskForEmail = localStorage.getItem('seenAskForEmail');

  if (seenAskForEmail === 'true') {
    timeToAsk = 0;
  } else {
    timeToAsk = 4000;
  }

  $('.ask-email, .ask-consent .btn-primary, .ask-consent .no-thanks').hide();
  //$('.ask-consent .btn').css('opacity', 0);

  $('.go-on').on('click', openSecondSection);

  $('.no-thanks').on('click', function(){
    closeEmailCapture();
    setDismissedAsk();
  });

  $('.submit-email').on('click', processSubmittedEmail);

  if (askedForEmail != 'true') {
    setTimeout(function(){
      openEmailCapture(timeToAsk);
    }, timeToAsk);
  }

  $('body').on('keypress', function(keypress){
    console.log(keypress)
    if (keypress.keyCode === 33) { // Shift-1
      localStorage.setItem('askedForEmail', false);
      localStorage.setItem('seenAskForEmail', false);
    }
  })
});

