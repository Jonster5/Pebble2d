import * as THREE from '../../../inc/three/three.module.js'
import env from '../core/env.js'

let raycaster = false

function init(){

	if(raycaster) return raycaster

	raycaster = new THREE.Raycaster(); 
	// mouse = new THREE.Vector2();

	if(!env.DEV) document.getElementById('dev').style.display = 'none'

	return raycaster


}

export { init }