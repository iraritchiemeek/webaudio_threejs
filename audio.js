function AudioThing() {
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

AudioThing.prototype.append = function(type, target, elem) {
	$("#" + target).append("<div " + type + "=" + elem + "/>")
};

AudioThing.prototype.appendShape = function() {
	$("#container").append("<div id='shape'/>")
	$("#shape").append("<div id='dog'/>")
};

AudioThing.prototype.appendAlbumArt = function(url) {
	$("#album-art").css({backgroundImage: "url(" + url + ")"})
};

AudioThing.prototype.getFreqData = function(done) {
	var self = this;
	var interval = setInterval(function() {
		self.analyser.getByteFrequencyData(self.frequencyData);
		var avgAmp = self.avg(self.frequencyData);
		done(avgAmp)
	}, 30);
};

AudioThing.prototype.moveShape = function (avgAmp) {
	this.audio.play();
	$('#dog').css({'-webkit-transform' : 'rotate(' + (avgAmp *2) + 'deg)',})
};

AudioThing.prototype.avg = function(array) {
	var avg = 0
	$.each(array, function(index, value){
		avg += value
	})
	return (avg / array.length) 
};


