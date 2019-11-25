import * as THREE from '../../../inc/three/three.module.js'

import env from '../core/env.js'

let renderer = false

export default (function(){
// function init(){

	if(renderer) return renderer


	renderer = new THREE.WebGLRenderer( { 
		antialias: true,
		alpha: true
	} )
	// renderer.setClearColor( 0x000000, 0 )
	renderer.setPixelRatio( window.devicePixelRatio )
	renderer.setSize( window.innerWidth/env.RESOLUTION, window.innerHeight/env.RESOLUTION, false )

	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap

	renderer.domElement.id = 'sky'
	renderer.domElement.tabindex = 1

	// renderer.physicallyCorrectLights = true //accurate lighting that uses the SI units

	// renderer.domElement.classList.add('input-frame')
	// renderer.domElement.classList.add('input-frame--has-focus')

	// renderer.custom_prop = 'blorble'

	// console.log(renderer)

	// console.log('disabling renderer logs to prevent shader warnings in Firefox')
	// renderer.context.getShaderInfoLog = function () { return '' }
	// renderer.getContext.getShaderInfoLog = function () { return '' }

	document.body.appendChild( renderer.domElement )

	return renderer

})()


// export { init }


