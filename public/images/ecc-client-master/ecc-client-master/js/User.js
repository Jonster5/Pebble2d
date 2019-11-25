import { 

	BoxBufferGeometry, 
	LineSegments, 
	WireframeGeometry 

} from '../inc/three/three.module.js'

import * as KEYS from './sky/ui/KEYS.js'
import env from './sky/core/env.js'
import STATE from './sky/core/STATE.js'
import Ship from './sky/game/Ship.js'


export default class {

	constructor( init ){

		init = init || {}

		this.PILOT = init.PILOT || false
		this.settings = init.settings || {
			movement: {
				look_speed: .0025
			},
			camera_vertical_offset: 20,
			camera_horizontal_offset: -40
		}
		this.bindings = init.bindings || {}
		this.confirmed = init.confirmed || false
		this.email = init.email || false
		this.id = init.id || false
		this.last_log = init.last_log || false
		this.level = init.level || false
		this.pilots = init.pilots || false
		this.box = init.box || false

	}

	async arrive() {

		KEYS.apply( this.settings.bindings )
		KEYS.init()

		// build ship

		console.log( this.PILOT )

		this.PILOT.SHIP = new Ship( this.PILOT.ship_data )

		// console.log( 'arriving with: ', this.PILOT.SHIP )

		this.PILOT.SHIP.MESH = await this.PILOT.SHIP.model()

		// build user box

		// const geo = USER.PILOT.SHIP.MESH.children[0].children[0].children[0].children[0].children[0].geometry

		const box = new BoxBufferGeometry(3, 3, 3)
		const wires = new WireframeGeometry( box )

		this.box = new LineSegments( wires )
		this.box.material.depthTest = false
		this.box.material.opacity = env.BOX_OPACITY
		this.box.material.transparent = true

		// replace with Primary Station
		this.box.position.x = 0 
		this.box.position.y = 0 
		this.box.position.z = 50 

		return true

	}


	

}

























