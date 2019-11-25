
import env from '../core/env.js'
// import * as THREE from '../../../inc/three/three.module.js'
// import { OrbitControls } from '../../../inc/three/myOrbitControls.mod.js'
import { TrackballControls } from '../../../inc/three/myTrackballControls.js'
// import { EccControls } from '../../../inc/three/EccControls.js'

// import * as 
// import * as camera from './CAMERA.js'
import CAMERA from './CAMERA.js'
// import * as renderer from './RENDERER.js'
import RENDERER from './RENDERER.js'

let controls = false

// function init(){
export default (function (){

	if(controls) return controls

	// const c = camera.init()
	// const r = renderer.init()

	if(typeof(OrbitControls) != 'undefined'){

		// THREE.Object3D.DefaultUp.x = 0
		// THREE.Object3D.DefaultUp.y = 1
		// THREE.Object3D.DefaultUp.z = 0
		
		// controls = {}
		controls = new OrbitControls( CAMERA, RENDERER.domElement )
		// controls = new TrackballControls( c, RENDERER.domElement )
		controls.enablePan = false
		controls.minDistance = env.MIN_CAM
		// // controls.maxDistance = MAX_DIST;
		controls.maxDistance = env.MAX_CAM

		// controls.maxPolarAngle = Math.PI * 2
		// controls.maxPolarAngle = Math.PI

	}else if(typeof(TrackballControls) != 'undefined'){

		controls = new TrackballControls( CAMERA, RENDERER.domElement )
		controls.enablePan = false
		// controls.minDistance = env.MIN_CAM
		// controls.maxDistance = env.MAX_CAM
		controls.rotateSpeed = 7.0;
		controls.zoomSpeed = 1.5;
		// controls.panSpeed = 0.8;
		controls.staticMoving = true;
		controls.dynamicDampingFactor = 10.3;
		// controls.keys = [ 65, 83, 68 ];

		// controls.addEventListener( 'change', render );

	}else if(typeof(EccControls) != 'undefined'){

		controls = new EccControls( CAMERA, RENDERER, domElement )

	}



	return controls

})()

// export { init }