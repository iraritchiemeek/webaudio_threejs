$(window).load(function() {
	var clientID = "9c9b8c34619bfdb30ddce8f638cd0c3e"

	var cube = new Cube()
	var audioThing = new AudioThing()
	var url = "https://soundcloud.com/spookyblack/bobby-raps-corbin-frozen-tundra?in=spookyblack/sets/bobby-raps-corbin-couch-potato"
	cube.config();
	cube.addCube();

	$.ajax({
      type: "GET",
      url: 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID
    }).done(function (res) {
		audioThing.getFreqData(function(avgAmp){
			cube.resize(avgAmp)
			audioThing.resizeShape(avgAmp);
		})
    	var streamUrl = res.stream_url + '?client_id=' + clientID;
      	var audio = new Audio(streamUrl);
      	cube.render();
		audioThing.configure(audio);
		audioThing.appendShape();
		audioThing.appendAlbumArt(res.artwork_url);
	})
	
});
