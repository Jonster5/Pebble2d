import env from '../core/env.js'
import GLOBAL from '../core/GLOBAL.js'
import { Scene, Color, FogExp2, AxesHelper } from '../../../inc/three/three.module.js'

let scene = false

export default (function(){

	if(scene) return scene

	scene = new Scene()

	if( GLOBAL.BACKGROUND ){
		scene.background = new Color( GLOBAL.BACKGROUND )
	}
	scene.fog = new FogExp2( GLOBAL.FOG_COLOR, GLOBAL.FOG_SCALAR )

	if(env.AXES){
		let axesHelper = new AxesHelper( 5 )
		scene.add( axesHelper )
	}

	scene.needs_render = false

	return scene

})()

