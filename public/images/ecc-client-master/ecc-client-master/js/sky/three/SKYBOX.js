
import env from '../core/env.js'
import GLOBAL from '../core/GLOBAL.js'

import { 
	MeshBasicMaterial, 
	BackSide, 
	CubeGeometry, 
	TextureLoader,
	Mesh
} from '../../../inc/three/three.module.js'

// import texLoader from 'TexLoader.js'
// import { OrbitControls } from '../../../inc/three/OrbitControls.js'

import SCENE from './SCENE.js'

// import * as SCENE from './SCENE.js'
// import * as renderer from './Renderer.js'

let skyBox = false

function init(){

	if(skyBox) return skyBox

	const box_img = '/static/resources/textures/skybox/bluecloud_'

	const directions  = ['ft', 'bk', 'up', 'dn', 'rt', 'lt']

	let skyGeometry = new CubeGeometry( GLOBAL.SKY_WIDTH, GLOBAL.SKY_WIDTH, GLOBAL.SKY_WIDTH )	
	let materialArray = new Array(6)

	const loader = new TextureLoader()
		
	for(let i=0;i<6;i++){
		loader.load( '/static/resources/textures/skybox/starfield.jpg', function(tex){
		// loader.load( box_img + directions[i] + '.jpg', function(tex){
			materialArray[i] =  new MeshBasicMaterial({
				map: tex,
				side: BackSide,
				fog: false
			})		
		} )
	}
		
	skyBox = new Mesh( skyGeometry, materialArray )

	if(env.SKYBOX) SCENE.add( skyBox )

	return skyBox

}

export { init }