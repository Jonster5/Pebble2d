import STATE from './sky/core/STATE.js'
import DATA from './DATA.js'
import SOUND from './SOUND.js'
import env from './sky/core/env.js'







function hal(msg, time, type){

	if(!type) type = 'standard'

	const a = document.createElement('div')
	const am = document.createElement('div')
	const close = document.createElement('div')

	close.innerHTML = 'X'
	close.classList.add('alert-close')

	am.innerHTML = `<div class='alert-icon type-${ type }'>${ DATA.icons[type] }</div>${ msg }`
	a.classList.add('alert-wrap')
	am.classList.add('alert-msg', type)
	am.appendChild(close)
	a.appendChild(am)

	document.getElementById('alert-contain').appendChild(a)

	close.onclick = function(){
		a.style.opacity = 0
		setTimeout(function(){
			a.remove()
		}, 500)
	}

	if(time){
		setTimeout(function(){
			a.style.opacity = 0
			setTimeout(function(){
				a.remove()
			}, 500)
		}, time)
	}

	if(type === 'error') {
		if(UI.spinner) UI.spinner.hide()
	}
}




class Panel {

	constructor(init_obj){
		this.init_obj = init_obj || {}
		this.type = init_obj.type || 'div'
		this.id = init_obj.id 
		this.classes = init_obj.classes
		this.attr = init_obj.attr
		this.parent = init_obj.parent || document.body
		this.appended = init_obj.appended
		this.ele = init_obj.ele
		this.innerHTML = init_obj.innerHTML
		this.fader = init_obj.fader
		this.callback = init_obj.callback
	}
	render(){
		let ele = document.createElement(this.type)
		ele.id = this.id
		if(this.innerHTML){
			ele.innerHTML = this.innerHTML
		}
		if(this.classes){
			for(let i = 0; i<this.classes.length; i++){
				ele.classList.add(this.classes[i])
			}	
		}
		if(this.attr){
			for(let i = 0; i<this.attr.length; i++){
				ele.setAttribute(this.attr[i].key, this.attr[i].value)
			}
		}
		this.appended ? this.parent.appendChild(ele) : this.parent.prepend(ele)
		this.ele = ele
	}
	show(){
		if(this.fader) {
			this.ele.style.opacity = '1'
			this.ele.style['pointer-events'] = 'initial'
		}else{
			this.ele.style.display = 'none'
		}
		if(this.callback) this.callback.show()
	}
	hide(){
		if(this.fader) {
			this.ele.style.opacity = '0'
			this.ele.style['pointer-events'] = 'none'
		}else{
			this.ele.style.display = 'initial'
		}
		if(this.callback) this.callback.hide()
	}
	
}






const components = {

	spinner: {
		type: 'div',
		id: 'spinner',
		classes: ['flex-wrapper'],
		innerHTML: '<img src="/static/media/spinner.gif"></div>',
		fader: true
	},

	flash: {
		type: 'div',
		id: 'flash-contain',
		classes: ['flex-wrapper'],
		innerHTML: '<img src="/static/media/light.png" id="flash">',
		fader: true,
		callback: {
			show: function(){
				document.getElementById('flash').style.width = '2000%'
			},
			hide: function(){
				document.getElementById('flash').style.width = '0%'
			}
		}
		
	}

}













let UI = false

function getUI(){

	if(UI) return UI

	UI = {}
	for(let k in components){
		UI[k] = new Panel(components[k])
		UI[k].render()
	}

	window.UI = UI

	const ac = document.createElement('div')
	ac.id = 'alert-contain'
	document.body.prepend(ac)

	const buttons = document.getElementsByClassName('button')
	for( let i = 0; i < buttons.length; i++ ){
		buttons[i].addEventListener('click', function(){
			SOUND.ui.blip[0].play()
		})
	}

	UI.spinner.hide()

	return UI

}




export { getUI, hal }