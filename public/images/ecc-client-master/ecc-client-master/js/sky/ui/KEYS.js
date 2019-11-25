import STATE from '../core/STATE.js'
import USER from '../../USER.js'
import SOUND from '../../SOUND.js'


let	initialized = false
let sound_holder = false

const bindings = {
	global: {
		close: 27
	},
	main: {
		thrust: {
			forward: 87, // w
			back: 83, // s
		},
		yaw: {
			starboard: 39, // arr left
			port: 37 // arr right
		},
		pitch: {
			up: 40, // arr up
			down: 38 // arr down
		},
		roll: {
			cw: 65, // d
			ccw: 68 // a
		},
		pop_chat: 13
	},
	chat: {
		send: 13
	},
	action: {
		fire: {
			primary: 32, // space
			secondary: 9 // tab
		}
	}
}

const handlers = {

	global: {

		down: function(e){

			// switch(e.keyCode){
			// 	case bindings.global.close:
			// 		unbind()
			// 		document.addEventListener('keyup', handlers.main)
			// 		break;
			// 	default: break
			// }
		},

		up: function(e){

			switch(e.keyCode){
				case bindings.global.close:
					unbind()
					document.addEventListener('keyup', handlers.main)
					break;
				default: break
			}

		}

	},

	main: {

		down: function(e){

			// STATE.sound.emit = true
			sound_holder = false

			switch(e.keyCode){

			case bindings.main.roll.ccw:
				if( !STATE.sound.emit ) sound_holder = 'thrust'
				STATE.roll.ccw = true
				break
			case bindings.main.roll.cw:
				if( !STATE.sound.emit ) sound_holder = 'thrust'
				STATE.roll.cw = true
				break

			case bindings.main.thrust.forward: 
				if( !STATE.sound.emit ) sound_holder = 'thrust'
				STATE.thrust.forward = true
				break
			case bindings.main.thrust.back:
				if( !STATE.sound.emit ) sound_holder = 'thrust'
				STATE.thrust.back = true
				break

			case bindings.main.yaw.port: 
				if( !STATE.sound.emit ) sound_holder = 'thrust'
				STATE.yaw.port = true
				break
			case bindings.main.yaw.starboard: 
				if( !STATE.sound.emit ) sound_holder = 'thrust'
				STATE.yaw.starboard = true
				break

			case bindings.main.pitch.up: 
				if( !STATE.sound.emit ) sound_holder = 'thrust'
				STATE.pitch.up = true
				break
			case bindings.main.pitch.down: 
				if( !STATE.sound.emit ) sound_holder = 'thrust'
				STATE.pitch.down = true
				break

			default: 
				STATE.sound.emit = false
				break

			}

			if( !STATE.sound.emit && sound_holder ) {
				STATE.sound.emit = true
				// SOUND.fade_in( SOUND.loops[ sound_holder ], 300 )
				SOUND.loops[ sound_holder ][0].play()
				sound_holder = false
			}

		},

		up: function(e){

			switch(e.keyCode){
				
			case bindings.main.thrust.forward: 
				STATE.sound.emit = false; 
				SOUND.loops.thrust[0].pause(); SOUND.loops.thrust[0].currentTime = 0
				// SOUND.fade_out( SOUND.loops.thrust, 300 )
				STATE.thrust.forward = false
				break
			case bindings.main.thrust.back:
				STATE.sound.emit = false; 
				SOUND.loops.thrust[0].pause(); SOUND.loops.thrust[0].currentTime = 0
				// SOUND.fade_out( SOUND.loops.thrust, 300 )
				STATE.thrust.back = false
				break
			case bindings.main.yaw.port: 
				STATE.sound.emit = false; 
				SOUND.loops.thrust[0].pause(); SOUND.loops.thrust[0].currentTime = 0
				// SOUND.fade_out( SOUND.loops.thrust, 300 )
				STATE.yaw.port = false
				break
			case bindings.main.yaw.starboard: 
				STATE.sound.emit = false; 
				SOUND.loops.thrust[0].pause(); SOUND.loops.thrust[0].currentTime = 0
				// SOUND.fade_out( SOUND.loops.thrust, 300 )
				STATE.yaw.starboard = false
				break
			case bindings.main.pitch.up: 
				STATE.sound.emit = false; 
				SOUND.loops.thrust[0].pause(); SOUND.loops.thrust[0].currentTime = 0
				// SOUND.fade_out( SOUND.loops.thrust, 300 )
				STATE.pitch.up = false
				break
			case bindings.main.pitch.down: 
				STATE.sound.emit = false; 
				SOUND.loops.thrust[0].pause(); SOUND.loops.thrust[0].currentTime = 0
				// SOUND.fade_out( SOUND.loops.thrust, 300 )
				STATE.pitch.down = false
				break
			
			
			case bindings.main.roll.ccw:
				STATE.sound.emit = false; 
				SOUND.loops.thrust[0].pause(); SOUND.loops.thrust[0].currentTime = 0
				// SOUND.fade_out( SOUND.loops.thrust, 300 )
				STATE.roll.ccw = false
				break
			case bindings.main.roll.cw:
				STATE.sound.emit = false; 
				SOUND.loops.thrust[0].pause(); SOUND.loops.thrust[0].currentTime = 0
				// SOUND.fade_out( SOUND.loops.thrust, 300 )
				STATE.roll.cw = false
				break
			

			default: 
				break
			}

			if( e.keyCode == bindings.main.pop_chat ){

				document.removeEventListener('keydown', handlers.main)
				document.addEventListener('keydown', handlers.chat)

				document.removeEventListener('keyup', handlers.main)
				document.addEventListener('keyup', handlers.chat)

			}

		}

	},

	action: function(e){

		switch(e.keyCode){
		case bindings.action.fire.primary: 
			USER.PILOT.SHIP.fire('primary')
			break
		case bindings.action.fire.secondary:
			USER.PILOT.SHIP.fire('secondary')
			break
		default: break
		}

	},

	chat: function(e){

		switch(e.keyCode){
			case bindings.chat.send:
				console.log('send')
				// close chat
				break;
			default: break
		}

	},

}

function init(){

	if( !initialized ){

		document.addEventListener( 'keydown', handlers.global.down )
		document.addEventListener( 'keydown', handlers.main.down )

		document.addEventListener( 'keyup', handlers.global.up )
		document.addEventListener( 'keyup', handlers.main.up )

		initialized = true

	}

}

function unbind(){

	console.log('unbinding')

	for(let key in bindings){
		if(key  === 'global') continue
		document.removeEventListener('keyup', handlers[key])
	}

}

function apply(  ){
		
	Object.keys( bindings ).forEach( function( key ){
		if( USER.bindings[key] && typeof( USER.bindings[key] ) == 'number' ){
			bindings[key] = USER.bindings[key]
		}
	})

}





export { init, apply }
