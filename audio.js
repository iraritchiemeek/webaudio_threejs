function AudioThing () {
	this.numOfFrequencyBands = 512;
	this.context = new AudioContext();
	this.frequencyData = new Uint8Array(this.numOfFrequencyBands);
	this.output = this.context.destination;
}

AudioThing.prototype.configure = function(audio) {
  	this.audio = audio;
	this.audio.crossOrigin = 'anonymous';
	console.log(this.audio)
	this.source = this.context.createMediaElementSource(this.audio);
	this.output = this.context.destination;
	this.analyser = this.context.createAnalyser();
	this.analyser.fftSize = this.numOfFrequencyBands * 2;
	this.source.connect(this.analyser);
	this.analyser.connect(this.output);
};

AudioThing.prototype.appendShape = function() {
	$("#container").append("<div id='shape'/>")
};

AudioThing.prototype.appendAlbumArt = function(url) {
	$("#album-art").css({backgroundImage: "url(" + url + ")"})
};

AudioThing.prototype.resizeShape = function () {
	this.audio.play();
	var self = this;
	var interval = setInterval(function() {
		self.analyser.getByteFrequencyData(self.frequencyData);
		var avgAmp = self.avg(self.frequencyData);
		$('#shape').css({height: 500 - avgAmp, width: 500 - avgAmp})
	}, 30);
};

AudioThing.prototype.avg = function(array) {
	var avg = 0
	$.each(array, function(index, value){
		avg += value
	})
	return (avg / array.length) 
};


