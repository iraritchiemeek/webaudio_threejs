function Cube() {
}

Cube.prototype.config = function() {	
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	this.renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.gammaInput = true;
	this.renderer.gammaOutput = true;
	$("#container").append( this.renderer.domElement );
};

Cube.prototype.addCube = function() {
	var r = 800;
	this.segments = 512;
	this.positions = new Float32Array( this.segments * 3 );
	this.colors = new Float32Array( this.segments * 3 );
	this.geometry = new THREE.BufferGeometry();
	this.material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
	this.cube = new THREE.Line( this.geometry, this.material );
	this.scene.add( this.cube );
	this.camera.position.z = 5;

	for ( var i = 0; i < this.segments; i ++ ) {
		var x = Math.random() * r - r / 2;
		var y = Math.random() * r - r / 2;
		var z = Math.random() * r - r / 2;

		this.positions[ i * 3 ] = x;
		this.positions[ i * 3 + 1 ] = y;
		this.positions[ i * 3 + 2 ] = z;

		this.colors[ i * 3 ] = ( x / r ) + 0.5;
		this.colors[ i * 3 + 1 ] = ( y / r ) + 0.5;
		this.colors[ i * 3 + 2 ] = ( z / r ) + 0.5;
	}
	this.geometry.addAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );
	this.geometry.addAttribute( 'color', new THREE.BufferAttribute( this.colors, 3 ) );

	this.geometry.computeBoundingSphere();
};

Cube.prototype.resize = function(freqData) {
	this.cube.scale.x = (freqData / 20);
	this.cube.scale.y = (freqData / 20);
};

Cube.prototype.render = function() {
	requestAnimationFrame( this.render.bind(this) );
	this.cube.rotation.x += 0.01;
	this.cube.rotation.y += 0.01;
	this.renderer.render(this.scene, this.camera);
};
