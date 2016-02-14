function loadAudio(urls) {
  var audioContext = new AudioContext();
  var _buffer = {}
  urls.forEach(function (url){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(buffer) {
        _buffer[url] = buffer;
      });
    }
    request.send();
  })
  return {
    play: function(url){
      var source = audioContext.createBufferSource();
      source.buffer = _buffer[url]
      source.connect(audioContext.destination);
      source.start(0);
    }
  }
}
