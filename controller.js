$(window).load(function() {
	var clientID = "9c9b8c34619bfdb30ddce8f638cd0c3e"

	var cube = new Cube()
	var audioThing = new AudioThing()
	var url = "https://soundcloud.com/kirankai/eight-sides"
	cube.config();
	cube.addCube();
	audioThing.append("id", "container", "shape");

	$.ajax({
      type: "GET",
      url: 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID
    }).done(function (res) {
		audioThing.getFreqData(function(avgAmp){
			cube.resize(avgAmp)
			audioThing.moveShape(avgAmp);
		})
    	var streamUrl = res.stream_url + '?client_id=' + clientID;
      	var audio = new Audio(streamUrl);
      	cube.render();
		audioThing.configure(audio);
		audioThing.append("id", "shape", "dog");
		audioThing.appendAlbumArt(res.artwork_url);
	})
	
});
