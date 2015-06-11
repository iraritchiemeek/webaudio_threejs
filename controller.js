$(window).load(function() {
	var audioThing = new AudioThing();
	var audio = new Audio("https://api.soundcloud.com/tracks/192238012/stream?client_id=656bff24d3cc1779a665f5d2ca2af810");
		audioThing.configure(audio);
		audioThing.appendTestElement();
	$(document).on("click", function() {
		audioThing.resizeSquare();
	})
});