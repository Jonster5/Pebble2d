
import { 

	TextureLoader, 
	PlaneBufferGeometry, 
	BoxBufferGeometry, 
	MeshBasicMaterial, 
	MeshLambertMaterial, 
	DoubleSide, 
	Mesh,
	Vector3

} from '../../../inc/three/three.module.js'

import PARTICLES from './PARTICLES.js'

import USER from '../../USER.js'

import GLOBAL from '../core/GLOBAL.js'

import SCENE from '../three/SCENE.js'



export default class {

	constructor( init ){

		init = init || {}
		this.count = init.count || 10
		this.category = init.category || 'ambient'
		this.bound = init.bound || GLOBAL.bounds.particle[ this.category ]
		this.texture = init.texture || 'crate'
		this.particles = init.particles || []
		
		this.env_project = new Vector3()
		this.center = new Vector3()

	}


	init(){

		let x, y, z
		const coords = []
		const start = -this.bound
		const diameter = this.bound * 2

		for ( let i = 0; i < this.count; i++ ){

			x = start + ( Math.random() * diameter )
			y = start + ( Math.random() * diameter )
			z = start + ( Math.random() * diameter )

			coords.push( {x: x, y: y, z: z} )

		}

		for( let i = 0; i < coords.length; i++ ){

			this.particles[i] = this.initParticle( this.texture, this.category, coords[i] )

			this.particles[i].position.x += USER.box.position.x
			this.particles[i].position.y += USER.box.position.y
			this.particles[i].position.z += USER.box.position.z

			this.particles[i].rotation.x += Math.random() * Math.PI 
			this.particles[i].rotation.y += Math.random() * Math.PI
			this.particles[i].rotation.z += Math.random() * Math.PI

			SCENE.add( this.particles[i] )

		}

		PARTICLES[ this.category ].push( this )

	}


	initParticle( tex, category, coord_array ){

		let texture, geometry, material, mesh

		switch( tex ){

			case 'crate':

				texture = new TextureLoader().load( '/static/resources/textures/crate.gif' );
				geometry = new BoxBufferGeometry( 2, 2, 2 );
				material = new MeshLambertMaterial( { map: texture } );
				mesh = new Mesh( geometry, material );

				break;

			case 'dust':

				geometry = new PlaneBufferGeometry( .1, .1 );
				material = new MeshBasicMaterial( { 
					color: 0x999999,
					side: DoubleSide
				} );
				mesh = new Mesh( geometry, material );

				break;

			default: break;

		}

		mesh.position.x = coord_array.x
		mesh.position.y = coord_array.y
		mesh.position.z = coord_array.z

		mesh.userData.spin = new Vector3( Math.random() / 50, Math.random() / 50, Math.random() / 50 )
		mesh.userData.drift = new Vector3( Math.random() / 50, Math.random() / 50, Math.random() / 50 )

		return mesh		

	}


	spin(){

		for( let i = 0; i < this.particles.length; i++ ){

			this.particles[i].rotation.x += this.particles[i].userData.spin.x 
			this.particles[i].rotation.y += this.particles[i].userData.spin.y 

		}

	}
	


	update(){

		this.env_project.copy( USER.PILOT.SHIP.momentum )
		this.env_project.multiplyScalar( GLOBAL.bounds.particle[ this.category ] )

		for(let i = 0; i < this.particles.length; i++){ 

			if( this.particles[i].position.distanceTo( USER.box.position ) > GLOBAL.bounds.particle[ this.category ] ){ 

				let new_pos = new Vector3().copy( USER.box.position )

				new_pos.x += ( ( Math.random() - .5 ) * GLOBAL.bounds.particle[ this.category ] ) + this.env_project.x 
				new_pos.y += ( ( Math.random() - .5 ) * GLOBAL.bounds.particle[ this.category ] ) + this.env_project.y 
				new_pos.z += ( ( Math.random() - .5 ) * GLOBAL.bounds.particle[ this.category ] ) + this.env_project.z 

				this.particles[i].rotation.x = this.particles[i].rotation.y = this.particles[i].rotation.z = Math.random() * Math.PI // maybe unnecessary - zero out huge accumulated Eulers ?
				this.particles[i].position.copy( new_pos )

			}

		}

	}


}


// export { init }