import USER from './../USER.js'
import log from '../log.js'

// import { init_session } from '../lookups.js'
import init_login from './login.js'
import init_register from './register.js'
import init_launch from './launch.js'

import { getUI, hal } from '../UI.js'

import { initAnimating } from './animate.js'

let UI

document.addEventListener('DOMContentLoaded', function(){

	UI = getUI()

	fetch('/fetch_user', {
		method: 'post'
	})
	.then( res => {

		res.json()
		.then( user => {
			
			Object.keys( user ).forEach( key => {
				USER[key] = user[key]
			})	

			window.USER = USER

			init_loc()


		})
		.catch( err => {
			console.log( err )
		})

		
	})
	.catch(err => (log('flag', 'init session err', err)))

})










function init_loc(){

	const href = location.href

	if(href.match(/login/)){
		init_login()
	}else if(href.match(/register/)){
		init_register()
	}else if(href.match(/launch/)){
		init_launch()
	}else{
		initAnimating(20)
	}
}

