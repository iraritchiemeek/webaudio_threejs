$(window).load(function() {
	var clientID = "9c9b8c34619bfdb30ddce8f638cd0c3e"

	var cube = new Cube()
	var audioThing = new AudioThing()
	var url = "https://soundcloud.com/djharrison-1/brown-sugar-drummed-out-mix"
	cube.config();
	audioThing.append("id", "container", "shape");
	for (var i = 0; i < 25; i++) {
		audioThing.append("class", "burnsies", "burns");
	}
	cube.addCube();

	$.ajax({
      type: "GET",
      url: 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID
    }).done(function (res) {
    	
		audioThing.getAvgFreqData(function(avgAmp){
			audioThing.moveShape(avgAmp);
			audioThing.resizeBurns(avgAmp);
			cube.resize(avgAmp)
		})

    	var streamUrl = res.stream_url + '?client_id=' + clientID;
      	var audio = new Audio(streamUrl);
      	cube.render();
		audioThing.configure(audio);
		audioThing.append("id", "shape", "dog");
		audioThing.appendAlbumArt(res.artwork_url);
	})
	
});
