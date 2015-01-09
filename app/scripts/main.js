/* global $ */
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

$('#playText').click(function() {
  var textToPlay = $('#sourceText').val();
  console.log(textToPlay);
  tts(textToPlay);
});

