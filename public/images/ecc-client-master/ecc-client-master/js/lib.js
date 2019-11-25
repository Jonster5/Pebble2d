// import { Vector3 } from '../inc/three/three.module.js'

export default {


	ensureHex: function(recvd_color){
		if(recvd_color == undefined || recvd_color == null || recvd_color == '' || recvd_color=='white'){ 
			return '#ffffff' 
		}
		if(recvd_color.match(/#/)){
			return recvd_color
		}
		if(recvd_color.length == 6 || recvd_color.length == 8){
			return '#' + recvd_color
		}
		if(recvd_color.match(/rgb/)){ // should always be hex
			var the_numbers = recvd_color.split("(")[1].split(")")[0];
			the_numbers = the_numbers.split(",");
			var b = the_numbers.map(function(x){						 
				x = parseInt(x).toString(16);	
				return (x.length==1) ? "0"+x : x; 
			})
			b = b.join("");
			return b
		}else{
			return '#ffffff'
		}
		
	},


	is_mongo_id_string: function(id){
		if ( id.match(/^[0-9a-fA-F]{24}$/) ) return true
		return false
	},


	scry: function( x, old_min, old_max, new_min, new_max ){

		const first_ratio = ( x - old_min ) / ( old_max - old_min )
		const result = ( first_ratio * ( new_max - new_min ) ) + new_min
		return result
	}

}
