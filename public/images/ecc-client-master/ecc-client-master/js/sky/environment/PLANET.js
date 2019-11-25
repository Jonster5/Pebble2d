import { 
	TextureLoader,
	PlaneBufferGeometry, 
	SphereBufferGeometry, 
	MeshLambertMaterial, 
	DoubleSide,
	Mesh 
} from '../../../inc/three/three.module.js'

import GLOBAL from '../core/GLOBAL.js'

let planet = false

export default (function(){

	if(planet) return planet

	const sphere = new SphereBufferGeometry( GLOBAL.PLANET_RADIUS, GLOBAL.PLANET_DETAIL, GLOBAL.PLANET_DETAIL )
	const mat = new MeshLambertMaterial( { color: 0x225588 })

	const mass = new Mesh( sphere, mat )

	const air = new SphereBufferGeometry( GLOBAL.PLANET_RADIUS + GLOBAL.PLANET_RADIUS* 1.05, GLOBAL.PLANET_DETAIL / 2, GLOBAL.PLANET_DETAIL / 2 )
	const moisture = new MeshLambertMaterial( { 
		color: 0xdcdcdc,
		transparent: true,
		opacity: .5
	})

	const atmosphere = new Mesh( air, moisture )
	
	planet =  {
		mass: mass,
		atmosphere: atmosphere
	}

	window.PLANET = planet

	return planet


})()

