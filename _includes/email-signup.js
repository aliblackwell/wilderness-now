$(function() {
  $('#user-name').on('keyup', function() {
    var username = $(this).val();
    console.log(username)
    $('#email-submit').attr('href', 'https://mcb2.typeform.com/to/CSWpkR?name='+username);
  })
})