import { Vector3 } from '../../../inc/three/three.module.js'
import Entity from './Entity.js'

export default class extends Entity {

	constructor(init){ 

		super( init )

		if( !init ) { console.log('no station data returned from server'); return false }

		this.data = init.data || {}

	}

}

