
// import log from '../log.js'
import env from './env.js'

import { initAnimating } from './animate.js'

import STATE from './STATE.js'

// import * as KEYS from '../ui/KEYS.js'
import * as MOUSE from '../ui/MOUSE.js'

// import Pilot from '../game/Pilot.js'
import Ship from '../game/Ship.js'

import RENDERER from '../three/RENDERER.js'
import SCENE from '../three/SCENE.js'
import CAMERA from '../three/CAMERA.js'

import ParticleSystem from '../environment/ParticleSystem.js'

import * as f from '../../fetches.js'
import USER from '../../USER.js'
import { hal, getUI } from '../../UI.js'

import { Vector3 } from '../../../inc/three/three.module.js'

import PLANET from '../environment/PLANET.js'

import Station from '../game/Station.js'

import * as LIGHT from '../environment/LIGHT.js'



const UI = getUI()	

// UI.flash.show()

document.addEventListener('DOMContentLoaded', function(){

	window.addEventListener( 'resize', onWindowResize, false )

	MOUSE.init()

	initialize()
		.then(res => {
			setTimeout( f => {
				UI.flash.hide()
			}, 500)
		})
		.catch( err => {
			let msg = 'There has been an error entering the atmosphere!  Please inform the Station Commander.'
			if( err.public ){
				msg += ' (' + err.public + ')'
			}
			hal( msg, null, 'error' )
			console.log( err )
		})

})






 










async function initialize(){

	window.USER = USER
	window.CAMERA = CAMERA
	window.STATE = STATE



	const user = await f.user()

	Object.keys( user ).forEach( key => {
		USER[key] = user[key]
	})

	const arrival = await USER.arrive() // await for glb ship model

	const station_key = USER.PILOT.station_key

	console.log('>>', station_key.system )

	const seti = await f.system( station_key.system )

	const system = seti.system

	if( system.stations.primary ){

		const primary = new Station( {
			data: system.stations.primary 
		})

		const station_model = await primary.model()

		station_model.position.set( 0, -150, 1200 )

		SCENE.add( station_model )

	}

	// console.log('SYSTEM LOOKUP: ', system)
	// user box attachments

	CAMERA.position.set( 0, USER.settings.camera_vertical_offset, -USER.settings.camera_horizontal_offset )
	// CAMERA.lookAt( USER.box.position.x, USER.box.position.y, USER.box.position.z )
	let facing = new Vector3()
	USER.PILOT.SHIP.MESH.getWorldDirection( facing )
	CAMERA.lookAt( facing )

	USER.box.add( CAMERA )
	// USER.box.add( USER.guide )

	USER.PILOT.SHIP.MESH.position.copy( USER.box.position )





	// get system

	// const system = await f.system()






	// particle rendering

	const crates = new ParticleSystem({
		texture: 'crate',
		category: 'fields',
		count: 35
	})

	const dust = new ParticleSystem({
		texture: 'dust',
		category: 'ambient',
		count: 35
	})
	
	dust.init()
	crates.init()




	// PLANET.mass.add( PLANET.atmosphere )

	// SCENE.add( PLANET.atmosphere )
	PLANET.mass.add( PLANET.atmosphere )
	SCENE.add( PLANET.mass )

	SCENE.add( USER.box )
	SCENE.add( USER.PILOT.SHIP.MESH )

	SCENE.add( LIGHT.one )
	SCENE.add( LIGHT.three )





	// if(STATE.socket){

	// 	// let ev = ['connect', 'connecting', 'disconnect', 'connect_error', 'connect_failed', 'error', 'message', 'reconnect', 'reconnecting', 'reconnect_failed']
	// 	let fails = ['disconnect', 'connect_failed', 'connect_error']
	// 	for(let i = 0; i< fails.length; i++){
	// 		STATE.socket.on(fails[i], function() {
	// 			STATE.socket.disconnect()
	// 			hal('connection status: ' + fails[i], null, 'error')
	// 			log('log', 'ws: ', fails[i])
	// 		})	
	// 	}
	// 	STATE.socket.on('message', function(data){
	// 		hal(data.msg || data, data.time || 10000)
	// 	})
	// 	STATE.socket.on('error', function(data){
	// 		hal(data.msg || data, data.time || 10000, 'error')
	// 	})
	// 	STATE.socket.on('hal', function(data){
	// 		hal(data.msg || data || 'msg from HAL', data.time || 5000, 'hal')
	// 	})

	// }




	initAnimating( env.FRAMERATE, env.CLIP_RATE )
	
}



















function onWindowResize(){

	CAMERA.aspect = window.innerWidth / window.innerHeight
	CAMERA.updateProjectionMatrix()
	RENDERER.setSize( window.innerWidth/env.RESOLUTION, window.innerHeight/env.RESOLUTION, false )

}





