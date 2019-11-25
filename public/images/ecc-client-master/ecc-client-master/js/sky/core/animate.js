

import STATE from './STATE.js'
import GLOBAL from './GLOBAL.js'
import env from './env.js'

import { init as init_sky } from '../three/SKYBOX.js'

import SCENE from '../three/SCENE.js'
import CAMERA from '../three/CAMERA.js'
import RENDERER from '../three/RENDERER.js'

import PARTICLES from '../environment/PARTICLES.js'
import PLANET from '../environment/PLANET.js'

import ENTITIES from '../game/ENTITIES.js'

import USER from '../../USER.js'

import { getUI, hal } from '../../UI.js'

import lib from '../../lib.js'

import { Vector3, Quaternion } from '../../../inc/three/three.module.js'

// DEFINITIONS

let fpsInterval, now, then, delta, needs_update, step_thrust

const UI = getUI()

const skyBox = window.SKYBOX = init_sky()
const facing = new Vector3()
const radar = new Vector3()
const origin = new Vector3( 0, 0, 0 )
let needs_align = 0

let SHIP
let MESH

// SETTINGS
let PDIST = GLOBAL.PLANET_DIST
let CLIP = 0
let CLIP_TURN = 0
const CLIP_RATE = 3 // every [ X ] frames, next CLIP_TYPES is updated.  Should cycle approx in 20 frames, so ..
const CLIP_TYPES = ['ambient', 'field', 'stations', 'npc', 'pc', 'planet_size'] // repeated on purpose to decrease other ratios

const cameraDir = new Vector3()


function initAnimating( fps ) {

	fpsInterval = 1000 / fps

	then = Date.now()

	window.PARTICLES = PARTICLES

	// PILOT = USER.PILOT

	SHIP = USER.PILOT.SHIP

	MESH = SHIP.MESH

	setTimeout(function(){
		animate()
	}, 500)

}






function animate( ){

	requestAnimationFrame( animate )

	now = Date.now()
	delta = now - then

	if ( delta > fpsInterval ) {

		then = now - ( delta % fpsInterval )







		if( STATE.pitch.up ){

			USER.box.rotateX( delta * ( USER.settings.movement.look_speed / 3 ) )
			needs_align += 5

		}else if( STATE.pitch.down ){

			USER.box.rotateX( - delta * ( USER.settings.movement.look_speed / 3 ) )
			needs_align += 5

		}

		if( STATE.yaw.port ){

			USER.box.rotateY( delta * USER.settings.movement.look_speed / 2 )
			needs_align += 5

		}else if( STATE.yaw.starboard ){

			USER.box.rotateY( - delta * USER.settings.movement.look_speed / 2 )
			needs_align += 5

		}

		
		if( STATE.roll.cw ){

			USER.box.rotateZ( delta * .001 )

			needs_align += 5

		}else if( STATE.roll.ccw ){

			USER.box.rotateZ( - delta * .001 )

			needs_align += 5

		}


		if( STATE.mousedown.left ){


		}

		if( STATE.mousedown.right ){

		
		}








		SHIP.inertia_pos.copy( USER.box.position )

		if( STATE.thrust.forward ){ 			

			MESH.getWorldDirection( facing )

			radar.copy( SHIP.momentum )

			radar.add( facing.multiplyScalar( SHIP.data.thrust * ( delta / 1000 ) )  )

			if( radar.distanceTo( origin ) < SHIP.data.speed_limit ){  

				// TOO GRABBY - prevents ANY movement with forward vector  
				// should still be able to alter

				SHIP.momentum.copy( radar )

			}

		}else if( STATE.thrust.back && SHIP.data.speed > -.1 ){ // again slerp

			// MESH.getWorldDirection( facing )

		}







		SHIP.inertia_pos.add( SHIP.momentum )
		// ^
		USER.box.position.copy( SHIP.inertia_pos ) // blorb, maybe
		// ^
		MESH.position.copy( USER.box.position )
		// ^^
		skyBox.position.copy( USER.box.position )
		// ^^
		PLANET.mass.position.set( USER.box.position.x, USER.box.position.y, USER.box.position.z + PDIST )


		// console.log( MESH.position )


	// 	// MOVE OTHER ENTITIES

	//  // blorb


	// 	// if( needs_update ) {
	// 	// 	CONTROLS.update() 
	// 	// 	needs_update = false
	// 	// }



		// slerping

		if( needs_align && MESH ) { // aligned > 0

			MESH.quaternion.slerp( USER.box.quaternion, SHIP.data.pitch_speed )
			needs_align--
			if( needs_align > 400 ) needs_align = 400

			// console.log('realigning')
			
		}

		// spinning / drifting

		for( let i = 0; i < PARTICLES.fields.length; i++ ){

			PARTICLES.fields[i].spin()

		}






		// clips

		if( CLIP > CLIP_RATE ){

			switch( CLIP_TYPES[ CLIP_TURN ] ){

				case 'ambient':

					for( let i = 0; i < PARTICLES.ambient.length; i++ ){

						PARTICLES.ambient[i].update() // ( and clip )

					}
					break;

				case 'fields':

					for( let i = 0; i < PARTICLES.fields.length; i++ ){

						PARTICLES.fields[i].update() 
					}
					break;

				case 'stations':

					for( let i = 0; i < ENTITIES.stations.length; i++ ){

						ENTITIES.stations[i].clip()

					}
					break;

				case 'npc':

					for( let i = 0; i < ENTITIES.npc.length; i++ ){

						ENTITIES.npc[i].clip()

					}
					break;

				case 'pc':

					for( let i = 0; i < ENTITIES.pc.length; i++ ){

						ENTITIES.pc[i].clip()

					}
					break;

				case 'planet_size':

					PLANET.mass.quaternion.z = lib.scry( USER.box.position.z, 0, GLOBAL.MAX_FLIGHT, 0, 2 )
					if( USER.box.position.z >= GLOBAL.MAX_FLIGHT ){

						if( USER.box.position.z - GLOBAL.MAX_FLIGHT > 10000 ){
							UI.flash.show()
							setTimeout(function(){
								location.href = location.href
							}, 1000)
						}else{
							hal('ABORT - entering planet atmosphere!!', 1000, 'error')
						}


					}

					break;

				default: break;

			}

			CLIP_TURN++

			if( CLIP_TURN > CLIP_TYPES.length ) CLIP_TURN = 0

			CLIP = 0

		}

		CLIP++








		RENDERER.render( SCENE, CAMERA )

	}

}

export { initAnimating }

