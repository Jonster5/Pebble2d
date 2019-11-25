import STATE from './sky/core/STATE.js'
import { hal } from './UI.js'



const pilots = async(ecc) => {

	const p = await	fetch('/fetch_pilots', {
		method: 'post'
	})

	const response = await p.json()

	return response

}

// const init_session = async() => {


// 	const r = await fetch('init_session', {
// 		method: 'post'
// 	})

// 	const session = await r.json()

// 	// STATE.session = await r.json()

// 	// window.STATE = STATE

// 	return session

// }

const user = async() => {

	const u = await fetch('/fetch_user', {
		method: 'post'
	})
	
	const user = await u.json()

	return user

}



const system = async( key ) => {

	const s = await fetch('/fetch_system', {
		method: 'post',
		body: JSON.stringify({
			sys_id: key
		})
	})

	const system = await s.json()

	return system

}

export { 
	user, 
	pilots, 
	system 
}

// init_session