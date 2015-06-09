$(document).ready(function(){
	var context = new AudioContext();
	var url = "mp3/7am-smoked-salmon.mp3"
	var audioElement = document.getElementById("audio");
	
	audioElement.addEventListener("canplay", function() {
	    var source = context.createMediaElementSource(audioElement);
	    source.connect(context.destination);
	});

	var request = new XMLHttpRequest();
	request.open("GET", "mp3/7am-smoked-salmon", true);
	request.responseType = "arraybuffer";

	request.onload = function() {
	    var source = context.createBufferSource();
	    source.buffer = context.createBuffer(request.response, false);
	}

	request.send();
})