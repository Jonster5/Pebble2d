
import env from '../core/env.js'
import { DirectionalLight, HemisphereLight } from '../../../inc/three/three.module.js'

// import * as camera from './Camera.js'
// import SCENE from './SCENE.js'

// const lights = []

// function init(li_array){

	// if(light.castShadow) return light

	// let reponse = []

	// for(let i = 0; i < li_array.length; i++){
	// 	if(li_array[i].intensity){
	// 		response.push(li_array[i])
	// 	}else{
			
	// 	}
	// }
	
	const one = new DirectionalLight( env.DIRECTIONAL_COLOR, env.DIRECTIONAL_INTENSITY * 10)
	one.position.set( 1, 1, 1 )
	one.castShadow = true

	// const light2 = new DirectionalLight( env.DIRECTIONAL_BACKLIGHT )
	// light2.position.set( - 1, - 1, - 1 )
	// SCENE.add( light2 )

	const three = new HemisphereLight( env.HEMI_BACK_COL, env.HEMI_FACE_COL, env.HEMI_INTENSITY)
	// 
	// console.log(light3, light2, light1)

	// return true

// }

export { one, three }