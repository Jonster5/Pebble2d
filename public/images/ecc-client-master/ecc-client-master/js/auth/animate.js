


import lib from '../lib.js'
import env from '../sky/core/env.js'
import GLOBAL from '../sky/core/GLOBAL.js'

import { 
	MeshBasicMaterial,
	BoxBufferGeometry,
	DirectionalLight, 
	HemisphereLight, 
	Vector3, 
	Quaternion,
	PerspectiveCamera,
	TextureLoader,
	PlaneBufferGeometry, 
	SphereBufferGeometry, 
	MeshLambertMaterial, 
	DoubleSide,
	Mesh,
	Scene, 
	Color, 
	FogExp2, 
	AxesHelper,
	PCFSoftShadowMap,
	WebGLRenderer
} from '../../inc/three/three.module.js'

import { init as init_sky } from '../sky/three/SKYBOX.js'


	
const one = window.ONE = new DirectionalLight( env.DIRECTIONAL_COLOR, env.DIRECTIONAL_INTENSITY * 10)
one.position.set( 1, 1, 1 )
one.castShadow = true

const three = window.THREE = new HemisphereLight( env.HEMI_BACK_COL, env.HEMI_FACE_COL, env.HEMI_INTENSITY)

const CAMERA = new PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, GLOBAL.VIEW )

const sphere = new SphereBufferGeometry( GLOBAL.PLANET_RADIUS, GLOBAL.PLANET_DETAIL, GLOBAL.PLANET_DETAIL )
const mat = new MeshLambertMaterial( { 
	color: 0x225588 
})

const mass = new Mesh( sphere, mat )

const air = new SphereBufferGeometry( GLOBAL.PLANET_RADIUS + GLOBAL.PLANET_RADIUS* 1.05, GLOBAL.PLANET_DETAIL / 2, GLOBAL.PLANET_DETAIL / 2 )
const moisture = new MeshLambertMaterial( { 
	color: 0xdcdcdc,
	transparent: true,
	opacity: .5
})

const atmosphere = new Mesh( air, moisture )

const PLANET =  {
	mass: mass,
	atmosphere: atmosphere
}


const SCENE = new Scene()

if( GLOBAL.BACKGROUND ){
	SCENE.background = new Color( GLOBAL.BACKGROUND )
}
SCENE.fog = new FogExp2( GLOBAL.FOG_COLOR, GLOBAL.FOG_SCALAR )

if(env.AXES){
	let axesHelper = new AxesHelper( 5 )
	SCENE.add( axesHelper )
}

SCENE.needs_render = false









class Entity {

	constructor( init ){

		init = init || {}

		this.id = init.id
		this.MESH = init.MESH 

	}

	model(){

		const gltf = new GLTFLoader()

		return new Promise((resolve, reject) => {

			gltf.load( '/static/resources/geometries/' + this.data.model_url, 

				( obj ) => {

					resolve( obj.scene )

				}, (xhr) => {

					// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )

				}, ( error ) => {

					console.log( 'error loading model: ', error )
					reject( {
						public: 'model not found',
						model: this.model_url
					})

				})

		})

	}

	render(){

		SCENE.add( this.MESH )
		ENTITIES[ this.type ].push( this.id )

	}

	dispose(){

		ENTITIES[ this.type ].slice( 
			ENTITIES[ this.type ].indexOf( this.id ), 
			ENTITIES[ this.type ].indexOf( this.id ) + 1 )

	}

}








const RENDERER = new WebGLRenderer( { 
	antialias: true,
	alpha: true
} )

RENDERER.setPixelRatio( window.devicePixelRatio )
RENDERER.setSize( window.innerWidth/env.RESOLUTION, window.innerHeight/env.RESOLUTION, false )

RENDERER.shadowMap.enabled = true
RENDERER.shadowMap.type = PCFSoftShadowMap

RENDERER.domElement.id = 'sky'
RENDERER.domElement.tabindex = 1

document.body.appendChild( RENDERER.domElement )








const PARTICLES = {

	ambient: [],

	fields: []

}


class ParticleSystem {

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

			// this.particles[i].position.x += USER.box.position.x
			// this.particles[i].position.y += USER.box.position.y
			// this.particles[i].position.z += USER.box.position.z

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

		// this.env_project.copy( USER.PILOT.SHIP.momentum )
		this.env_project.copy( 0, 0, 0 )

		this.env_project.multiplyScalar( GLOBAL.bounds.particle[ this.category ] )

		for(let i = 0; i < this.particles.length; i++){ 

			if( this.particles[i].position.distanceTo( 0, 0, 0 ) > GLOBAL.bounds.particle[ this.category ] ){ 

				let new_pos = new Vector3().copy( 0, 0, 0 )

				new_pos.x += ( ( Math.random() - .5 ) * GLOBAL.bounds.particle[ this.category ] ) + this.env_project.x 
				new_pos.y += ( ( Math.random() - .5 ) * GLOBAL.bounds.particle[ this.category ] ) + this.env_project.y 
				new_pos.z += ( ( Math.random() - .5 ) * GLOBAL.bounds.particle[ this.category ] ) + this.env_project.z 

				this.particles[i].rotation.x = this.particles[i].rotation.y = this.particles[i].rotation.z = Math.random() * Math.PI // maybe unnecessary - zero out huge accumulated Eulers ?
				this.particles[i].position.copy( new_pos )

			}

		}

	}


}
















// DEFINITIONS
let fpsInterval, now, then, delta, needs_update, step_thrust

let CLIP = 0
let CLIP_TURN = 0
const CLIP_RATE = 3 // every [ X ] frames, next CLIP_TYPES is updated.  Should cycle approx in 20 frames, so ..
const CLIP_TYPES = ['ambient', 'field', 'stations', 'npc', 'pc', 'planet_size'] // repeated on purpose to decrease other ratios

let panX, panY = 0

const cameraDir = new Vector3()


function initAnimating( fps ) {


	if( !location.href.match(/launch/) && !location.href.match(/login/) && !location.href.match(/register/) ){

		const skyBox = init_sky()

		fpsInterval = 1000 / fps

		then = Date.now()

		const crates = new ParticleSystem({
			texture: 'crate',
			category: 'fields',
			count: 100
		})

		// const dust = new ParticleSystem({
		// 	texture: 'dust',
		// 	category: 'ambient',
		// 	count: 35
		// })

		// dust.init()
		crates.init()

		window.CAMERA = CAMERA
		window.PLANET = PLANET

		PLANET.mass.position.set( 850, 10, 10 )
		CAMERA.lookAt( PLANET.mass.position )

		SCENE.add( one )
		SCENE.add( three )

		SCENE.add( skyBox )

		// setTimeout(function(){
				animate()
		// }, 500)

	}

}






function animate( ){



	requestAnimationFrame( animate )

	now = Date.now()
	delta = now - then

	if ( delta > fpsInterval ) {


		then = now - ( delta % fpsInterval )



		// spinning / drifting

		for( let i = 0; i < PARTICLES.fields.length; i++ ){

			PARTICLES.fields[i].spin()

		}


		// CAMERA.lookAt( PLANET.mass.position )
		CAMERA.rotation.x += .001
		CAMERA.rotation.y += .0005

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

				// case 'stations':

				// 	for( let i = 0; i < ENTITIES.stations.length; i++ ){

				// 		ENTITIES.stations[i].clip()

				// 	}
				// 	break;

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

