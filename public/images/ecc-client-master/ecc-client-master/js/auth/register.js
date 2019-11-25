import {getUI, hal } from '../UI.js'
import log from '../log.js'


export default function(){

	document.querySelector('form').addEventListener('submit', function(e){
		e.preventDefault()

		UI.spinner.show()

		register().catch(err => (hal('error registering', null, 'error')))
		
	})


}






const register = async() => {
	
	const r = await fetch('/register', {
	    method: 'post',
	    headers: {
	    	'Content-Type': 'application/json'
	    },
	    body:JSON.stringify({
	    	email: document.getElementById('email').value,
	    	password: document.getElementById('password').value
	    })
	})

	const response = await r.json()

    UI.spinner.hide()

    if(response.success){
		hal('Welcome!', 1000, 'success')
		setTimeout(function(){
			location.href='/'
		}, 1000)
    }else{
		hal(response.msg, 3000, 'error')	    			
    }

}