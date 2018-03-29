var closeTime = 750;

function closeExtension(){
  setTimeout(function(){
    window.close();
  }, closeTime);
}

function openOptions(){
  setTimeout(function(){
    chrome.tabs.create({
      "url": chrome.extension.getURL("options.html"),
    });
  }, closeTime);
}

window.onload = function() {
  chrome.tabs.getSelected(window.id, function (tab) {
    var apiKey = localStorage['GoogleUrlShortener_ApiKey'];
    if(apiKey == ''){
      $('p').text('empty preference');
      openOptions();
      return;
    }

    var url = tab.url;
    if(!url.match(/^https?:\/\//)){
      $('p').text('error');
      closeExtension();
      return;
    }

    $.ajax({
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      url: 'https://www.googleapis.com/urlshortener/v1/url?key=' + apiKey,
      data: '{"longUrl" : "' + url + '"}',
      success: function(json){
        if(json.error){
          $('p').text('error : ' + json.status_code);
          openOptions();
          return;
        }
        $('a').text(json.id);
        $('a').attr('title', tab.title);
        $('a').fadeIn();

        var input = document.getElementsByTagName('input');
        if(input.length > 0){
          input[0].value = json.id;
          input[0].select();
          document.execCommand('copy');

          $('p').text('done copy!');
          closeExtension();
          return;
        }
      },
      error: function(error){
        $('p').text('error!');
        openOptions();
        return;
      }
    });
  });
};
