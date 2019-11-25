import { Vector3 } from '../../../inc/three/three.module.js'
import { GLTFLoader } from '../../../inc/three/GLTFLoader.js'

import Entity from './Entity.js'

export default class extends Entity {

	constructor( init ){ 

		super( init )

		if( !init ) { console.log( 'no ship data returned from server' ); return false }

		this.data = init 

		this.momentum = new Vector3()
		this.facing = new Vector3()

		this.desired_pos = new Vector3()
		this.inertia_pos = new Vector3()

		this.previous = new Vector3()

	}


}

