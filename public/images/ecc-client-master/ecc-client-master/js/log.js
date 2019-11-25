
const log = {

	flag: true,
	log: true

}

export default function( type, d1, d2, d3, d4 ){

	if( log[type] ) {

		console.log(`${ type }: `, d1 ? d1 : '', d2 ? d2 : '', d3 ? d3 : '', d4 ? d4 : '')

	}

}


