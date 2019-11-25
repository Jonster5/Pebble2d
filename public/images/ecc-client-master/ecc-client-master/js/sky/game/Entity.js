
import SCENE from '../three/SCENE.js'
import ENTITIES from './ENTITIES.js'
import { GLTFLoader } from '../../../inc/three/GLTFLoader.js'


export default class Entity {

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

					// var some_material = new MeshBasicMaterial({
					// 	color: 0x333333
					// })
					// var some_mesh = new Mesh( obj.scene, some_material )

					resolve( obj.scene )
					// resolve( some_mesh )

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