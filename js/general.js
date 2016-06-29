$(function() {

  $('.activities-dropdown').click(function() {
    event.preventDefault();
  });

  //borrowed from jQuery easing plugin
  //http://gsgd.co.uk/sandbox/jquery.easing.php
  $.easing.easeInOutCubic = function(x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  };

  $('.arrow-scroll').click(function(event) {
    var target = $(this).attr('href');
    $(window).scrollTo(target, {
      interrupt: true,
      offset: {
        top: -50
      },
      duration: 500,
      easing: 'easeInOutCubic'
    });
    event.preventDefault();
    return false
  })

  $('a.activity-link-jump').click(function(event){
    var target = $(this).attr('href');
    var slug = $(this).attr('data-slug');
    $('.activity-card').addClass('not-selected');
    $('#'+slug).removeClass('not-selected')
    setTimeout(function() {
      $('#'+slug).addClass('selected')
      setTimeout(function() {
        $('#'+slug).removeClass('selected');
        $('.activity-card').removeClass('not-selected');
      }, 1500);
    }, 1000);

    $(window).scrollTo(target, {
      interrupt: true,
      offset: {
        top: -60
      },
      duration: 1000,
      easing: 'easeInOutCubic'
    });
    event.preventDefault();
    return false
  })

});