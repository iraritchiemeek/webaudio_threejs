$(window).load(function() {
	var clientID = "9c9b8c34619bfdb30ddce8f638cd0c3e"


	// var cube = new Cube()
	var audioThing = new AudioThing()
	var url = "https://soundcloud.com/youngmanlisten/meddling-loops"
	// cube.init();
	// cube.animate();

	$.ajax({
      type: "GET",
      url: 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID
    }).done(function (res) {
    	var streamUrl = res.stream_url + '?client_id=' + clientID;
      	var audio = new Audio(streamUrl);
		audioThing.configure(audio);
		audioThing.appendShape();
		audioThing.appendAlbumArt(res.artwork_url);
		audioThing.resizeShape();
	})
	
});
