/* Author: 

*/

if (navigator.getUserMedia) {}
else if (navigator.webkitGetUserMedia) { navigator.getUserMedia = navigator.webkitGetUserMedia}
else if (navigator.mozGetUserMedia) { navigator.getUserMedia = navigator.mozGetUserMedia}
else if (navigator.msGetUserMedia) { navigator.getUserMedia = navigator.msGetUserMedia}




$(document).ready(function() {

	 var onFailSoHard = function(e) {
	    console.log('Reeeejected!', e);
	  };

	  // Not showing vendor prefixes.
	  navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
	    var video = document.getElementById('webcam');
	    video.src = window.URL.createObjectURL(localMediaStream);

	    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
	    // See crbug.com/110938.
	    video.onloadedmetadata = function(e) {
	      // Ready to go. Do some stuff.
	    };
	  }, onFailSoHard);

})




















