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

SC.initialize({
  client_id: '8302a40012160b3bf574dcfd5d38fcf6'
});

var track_url = '/tracks/293';
SC.stream(track_url, {auto_play: true}, function(stream) {
  console.log('playing stream');
  /*stream.play();
  setTimeout(function() {
    console.log('stopping stream');
    stream.stop();
  }, 1000);*/
});
