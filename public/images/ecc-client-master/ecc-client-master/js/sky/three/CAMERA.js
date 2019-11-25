import GLOBAL from '../core/GLOBAL.js'
import { PerspectiveCamera } from '../../../inc/three/three.module.js'

let camera = false

export default (function(){

	if(camera) return camera

	camera = new PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, GLOBAL.VIEW )
	// camera.position.set( 0, 300, -40 );

	camera.yaw = {}

	// camera.up = new THREE.Vector3(0, 0, 1)
	
	// controls.maxPolarAngle = Math.PI / 1.97;
	// controls.maxPolarAngle = Math.PI / 2;

	return camera

})()