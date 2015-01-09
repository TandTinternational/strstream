/* global $, SC */
console.log('\'Allo \'Allo!');

function getSpeachURL(text) {
  var urlString;
  urlString = 'http://tts-api.com/tts.mp3?q=';
  urlString += text.replace(/\s/gi, '+');
  //urlString += '&return_url=1';
  return urlString;
}

function tts(text, callback) {
  var url = getSpeachURL(text);
  console.log(url);
  var audioElem = $('<audio></audio>');
  audioElem.attr({ 'src': url, 'autoplay': true, 'preload': 'auto'});
  audioElem.on('ended', function() {
    console.log('derp');
    audioElem.remove();
    if (callback && typeof callback === 'function') {
      callback();
    }
  });
  $('body').append(audioElem);
}

function preloadText(text) {
  var url = getSpeachURL(text);
  console.log(url);
  var audioElem = $('<audio></audio>');
  audioElem.attr({'src': url, 'preload': 'auto'});
  audioElem.on('ended', function() {
    audioElem.remove();
  });
  $('body').append(audioElem);
  return audioElem[0];
}

var preloadedObject = preloadText('BBC - Horror fly that feasts on ant brains');

$('#playText').click(function() {

});

/* soundcloud stuff */
// http://api.soundcloud.com/tracks.json?client_id=2ffc286ad7480c76b16558e977b7380c&title=alejandro&limit=50
SC.initialize({
    client_id: '2ffc286ad7480c76b16558e977b7380c',
    redirect_uri: 'http://127.0.0.1:9000/callback.html'
  });

$('#track-search').submit(function() {
  var url = 'http://api.soundcloud.com/tracks.json?client_id=2ffc286ad7480c76b16558e977b7380c&limit=10&title' + $('#track-term').val();
  $.getJSON(url, function(data) {
    var items = [];
    $.each(data, function(key, val) {
      var seconds = Math.floor((val.duration/1000)%60);
      var minutes = Math.floor((val.duration/(1000*60))%60);
      items.push( "<li id='" + val.permalink_url + "'>" + val.title + " ("+minutes+":"+seconds+")</li>" );
    });
    $( '<ul/>', {
      "class": "my-new-list",
      html: items.join('')
    }).appendTo("#serch-results");
  });
});
