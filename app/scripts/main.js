/* global $, SC, document */
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

// var preloadedObject = preloadText('BBC - Horror fly that feasts on ant brains');

$('#playText').click(function() {

});

/* soundcloud stuff */
// http://api.soundcloud.com/tracks.json?client_id=2ffc286ad7480c76b16558e977b7380c&title=alejandro&limit=50
SC.initialize({
    client_id: '2ffc286ad7480c76b16558e977b7380c',
    redirect_uri: 'http://127.0.0.1:9000/callback.html'
  });

// jayvay-1/avicii-stories-albumid
// tracks/185272177
// http://soundcloud.com/devolverdigital/sets/hotline-miami-official
 //SC.oEmbed('http://soundcloud.com/jayvay-1/avicii-stories-albumid', {color: 'ff0066'},  document.getElementById('putTheWidgetHere'));

// really short - /track/170597613

var tracks = [
  '/tracks/170597613',
  '/tracks/185272177'
];

var notifcations = [
  'BBC - Horror fly that feasts on ant brains',
  'Hello world'
];

var shouldPlayNotification = true;

// plays a track
function playTrack(track) {
  console.log('starting stream of: ' + track);
  SC.stream(track, function(sound){
    console.log('have stream', track);
    sound.play({onfinish: function() {
      console.log('end of track: ' + track);
      if (shouldPlayNotification) {
        console.log('we should play a notifcation');
        tts(notifcations.shift(), function() {
          nextTrack();
        });
      } else {
        console.log('we are NOT playing a notifcation');
        return nextTrack();
      }
    }});
  });
}

// pops the next track off the queue and plays it
function nextTrack() {
  var track = tracks.shift();
  if (!track) {
    console.warn('No more tracks!');
    return;
  }
  playTrack(track);
}

// nextTrack();

/*SC.stream('/tracks/170597613', function(sound){
  sound.play({onfinish: function() {
    console.log('end');
  }});
});*/


   /*SC.get('/resolve/?url=https://soundcloud.com/sfxsource-sound-effects/sfxsourcecom-motor-forklift-truck', {limit: 1}, function(result){
       console.log(result);
   });*/


$('#track-search').submit(function(e) {
  e.preventDefault();
  var url = 'http://api.soundcloud.com/tracks.json?client_id=2ffc286ad7480c76b16558e977b7380c&limit=10&title' + $('#track-term').val();
  $.getJSON(url, function(data) {
    console.log(data);
    var items = [];
    $.each(data, function(key, val) {
      var seconds = Math.floor((val.duration/1000)%60);
      var minutes = Math.floor((val.duration/(1000*60))%60);
      var trackTitle = val.title + ' ('+minutes+':'+seconds+')';
      items.push("<li id='" + val.id + "'><a onClick=\"addTracks(\'" + trackTitle + "\', "+val.id+")\">" + trackTitle + "</a></li>" );
    });
    $( '<ul/>', {
      "class": "my-new-list",
      html: items.join('')
    }).appendTo('#search-results');
  });
});

function addTracks(title, url) {
  $('#currentPlaylist').append("<li id='"+url+"'>" + title + "</li>");

}

function createPlaylist(name) {

}
