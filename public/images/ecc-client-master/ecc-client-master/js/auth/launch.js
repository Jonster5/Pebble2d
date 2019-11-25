
// import STATE from '../STATE.js'
import USER from '../USER.js'

import { getUI, hal } from '../UI.js'
import log from '../log.js'
import SOUND from '../SOUND.js'
// import { pilots as fetch_pilots } from '../fetches.js'
import * as f from '../fetches.js'
import lib from '../lib.js'


export default function(){

	const ecc = window.ecc

	const UI = getUI()

	let pilots

	UI.spinner.show()

	document.getElementById('ecma-warning').remove()

	f.pilots( ecc )
	.then( res => {

		log( 'flag', 'pilot: ', res )

		if( res.success ) pilots = res.pilots


		if( !pilots.length ){

			if( USER.PILOT.license === 'provisional' ){

				hal('Hey, they even left their ID on the seat.  I\'m sure they won\'t miss it for a few hours...', 30000, 'hal')

				render_pilot( USER.PILOT )

			}else if( lib.is_mongo_id_string( USER.PILOT.id ) ){

				pilots.push( USER.PILOT )

			}

		}

		for(let i = 0; i < pilots.length; i++){

			render_pilot( pilots[i] )

		}			


		const p = document.getElementsByClassName('pilot')
		for( let i = 0; i < p.length; i++ ){
			if( p[i].getAttribute('data-license') === USER.PILOT.license ){
				p[i].classList.add('selected')
			}
		}

		document.getElementById('launch').addEventListener( 'click', function(){

			let selected = false
			const p = document.getElementsByClassName('pilot')

			if( USER.PILOT ){

				fetch( '/warn', {
					method: 'get'
				})
				.then(res => {
					res.json().then(res => {
						if(res.launch){
							hal(res.msg, 30000, 'hal')
							document.getElementById('launch').remove()
							setTimeout(function(){
								UI.flash.show()
								SOUND.fx.rock_breaking[0].play()
								document.getElementById('flash').style.width = '2000%'
							}, 3000)
							setTimeout(function(){
								location.href = res.launch
							}, 6000)
						}else{
							hal(res.msg, 5000, 'hal')
						}
					})
				})

			}else{
				hal('you must choose a pilot', 3000, '')
			}
		})
		UI.spinner.hide()
	})
	.catch(err => {
		log('flag', 'err fetching pilots: ', err)
	})
		
}








function render_pilot(p){

	let pilot = document.createElement('div')
	pilot.classList.add('pilot')
	pilot.setAttribute('data-license', p.license)
	let frame = document.createElement('div')
	frame.classList.add('frame', 'blip')
	let profile = document.createElement('img')
	profile.src = '/static/media/profiles/' + p.portrait
	let meta = document.createElement('div')
	meta.classList.add('pilot-meta')
	let name =document.createElement('div')
	name.innerHTML = '<span class="key">Name: </span>' + p.fname + ' ' + p.lname
	let licensed = document.createElement('div')
	licensed.innerHTML = '<span class="key">Licensed: </span>' + new Date(p.licensed)

	meta.appendChild(name)
	meta.appendChild(licensed)
	pilot.appendChild(meta)
	frame.appendChild(profile)
	pilot.appendChild(frame)

	document.getElementById('choice').appendChild(pilot)

	pilot.addEventListener('click', switch_pilot)

}




const set_active_pilot = async(license) => {

	const r = await fetch('/set_pilot', {
		method: 'post',
		body: JSON.stringify({
			license: license
		})
	})
	
	const response = await r.json()

	if(!response) hal('unable to set pilot', 3000, 'error')

	return response

}






function switch_pilot(){

	SOUND.ui.blip[0].play()

	const UI = getUI()

	if(!this.classList.contains('selected')){

		UI.spinner.show()

		set_active_pilot(this.getAttribute('data-license'))
		.then(res => {
			if(res.success){
				if(res.pilot){

					const pilots = document.getElementsByClassName('pilot')
					for(let i = 0; i< pilots.length; i++){
						pilots[i].classList.remove('selected')
					}
					this.classList.add('selected')

					USER.PILOT = res.pilot

				}
			}else{
				hal(res.msg || 'unable to set pilot', 5000, 'error')
			}
			UI.spinner.hide()
		})
		.catch(err => {
			UI.spinner.hide()
			hal('unable	to set pilot',  5000, 'error')
			log('flag', err)
		})
	}
}