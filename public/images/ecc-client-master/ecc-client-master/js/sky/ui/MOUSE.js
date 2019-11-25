import STATE from '../core/STATE.js'

import CAMERA from '../three/CAMERA.js'

import USER from '../../USER.js'

import env from '../core/env.js'
// import USER from '../../USER.js'

const buttons = ['left', 'middle', 'right']

function init(){

	document.getElementById('sky').addEventListener('mousedown', function(e){

		STATE.mousedown[buttons[e.button]] = true

		// let isRightMB
		// if ("which" in e){
    	    // isRightMB = e.which == 3; 
    	// }else if ("button" in e){
    	    // isRightMB = e.button == 2;
    	// }
   //  	if(isRightMB){
			// STATE.mouse.right = true
   //  	}
	})

	document.getElementById('sky').addEventListener('mouseup', function(e){

		STATE.mousedown[buttons[e.button]] = false

		// let type
		// if ("which" in e){
  //   	    e.which == 3 ? type = 'right' : false
  //   	}else if( "button" in e){
  //   		e.button == 2 ? type = 'right' : false
  //   	}
		// STATE.mouse[type] = false
	})

	// document.addEventListener( 'DOMMouseScroll', function( e ) {

	// 	console.log(e)
 //        // detect direction logic
 //    });



function detectMouseWheelDirection( e ){

    var delta = null//,
        // direction = false
    // ;

    if ( !e ) { // if the event is not provided, we get it from the window object
        e = window.event;
    }
    if ( e.wheelDelta ) { // will work in most cases
        delta = e.wheelDelta / 60;
    } else if ( e.detail ) { // fallback for Firefox
        delta = -e.detail / 2;
    }
    // if ( delta !== null ) {
    //     direction = delta > 0 ? 'up' : 'down';
    // }

    return delta
}



function handleMouseWheelDirection( delta ){

	// needs quaternion :/

	// CAMERA.position.z = Math.min( Math.max( CAMERA.position.z + delta, -env.MAX_CAM ), -env.MIN_CAM )

	// CAMERA.lookAt( USER.box.position )
	
}

document.onmousewheel = function( e ) {
	
    handleMouseWheelDirection( detectMouseWheelDirection( e ) );

};

if ( window.addEventListener ) {

	document.addEventListener( 'DOMMouseScroll', function( e ) {
		
	    handleMouseWheelDirection( detectMouseWheelDirection( e ) );

	});

}


}

export { init }