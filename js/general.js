$(function() {

  $('.activities-dropdown').click(function() {
    event.preventDefault();
  });


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
      duration: 1000
    });
    event.preventDefault();
    return false
  })

});