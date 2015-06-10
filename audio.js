function AudioThing () {
	this.numOfFrequencyBands = 512;
	this.context = new AudioContext();
	this.frequencyData = new Uint8Array(this.numOfFrequencyBands);
	this.output = this.context.destination;
}

AudioThing.prototype.configure = function(audio) {
  	this.audio = audio;
	this.audio.crossOrigin = 'anonymous';
	this.source = this.context.createMediaElementSource(this.audio);
	this.output = this.context.destination;
	this.analyser = this.context.createAnalyser();
	this.analyser.fftSize = this.numOfFrequencyBands * 2;
	this.source.connect(this.analyser);
	this.analyser.connect(this.output);
};



