let p = false

export default (function(){

	if(p) return p

	p = {

		ambient: [],

		fields: []

	}

	return p

})()