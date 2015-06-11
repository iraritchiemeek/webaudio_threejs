function Cube() {
}

Cube.prototype.config = function() {	
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	this.renderer = new THREE.WebGLRenderer({ alpha: true });
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	$("#container").append( this.renderer.domElement );
};

Cube.prototype.addCube = function() {
	this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
	this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	this.cube = new THREE.Mesh( this.geometry, this.material );
	this.scene.add( this.cube );
	this.camera.position.z = 5;
};

Cube.prototype.render = function(freqData) {
	// console.log(freqData)
	requestAnimationFrame( this.render.bind(this) );
	this.cube.scale.x = (freqData / 1000);
	this.cube.rotation.x += 0.01;
	this.cube.rotation.y += 0.01;
	this.renderer.render(this.scene, this.camera);
};
