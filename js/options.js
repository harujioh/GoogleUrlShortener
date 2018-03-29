var user = '';
var apiKey = '';

window.onload = function() {
  $('#apiKey').val(localStorage['GoogleUrlShortener_ApiKey']);

  $('form').submit(function(){
    localStorage['GoogleUrlShortener_ApiKey'] = $('#apiKey').val();

    window.close();
  });
};
