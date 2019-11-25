let sound = false
let c
let int
let volume_down

export default (function(){

	if( sound ) return sound

	sound = {

		ui: {

			// coin: [ new Audio('/static/resources/sound/coin.mp3'), 1],
			// coin_slide: [ new Audio('/static/resources/sound/coin_slide.mp3'), .5],
			// coin_jingle: [ new Audio('/static/resources/sound/coin_jingle.mp3'), .5],
			flip: [ new Audio('/static/resources/sound/phone_close.mp3'), .3],
			// bag: [ new Audio('/static/resources/sound/bag.mp3'), 1 ],
			// bird1: [ new Audio('/static/resources/ambien/bird1.mp3'), .5 ],	
			// bird2: [ new Audio('/static/resources/ambien/bird2.mp3'), .5 ],	
			// beep: false,
			// boop: false,
			blip: [ new Audio('/static/resources/sound/blip.mp3'), .1 ],
			// chop2: [ new Audio('/static/resources/sound/chop2.mp3'), 1 ],
			// chop3: [ new Audio('/static/resources/sound/chop3.mp3'), 1 ],
			// fumble: [ new Audio('/static/resources/sound/chop1.mp3'), 1 ],
			// hurt1: [ new Audio('/static/resources/sound/hurt1.mp3'), 1 ],
			// hurt2: [ new Audio('/static/resources/sound/hurt2.mp3'), 1 ],
			// insect1: [ new Audio('/static/resources/ambien/insect1.mp3'), .5 ],	
			// insect2: [ new Audio('/static/resources/ambien/insect2.mp3'), .5 ],	
			swoosh1: [ new Audio('/static/resources/sound/swoosh1.mp3'), .2 ],
			// swoosh2: [ new Audio('/static/resources/sound/swoosh2.mp3'), .7 ],
			// swoosh3: [ new Audio('/static/resources/sound/swoosh3.mp3'), .7 ],

		},

		fx: {

			rock_breaking: [ new Audio('/static/resources/sound/rock_breaking.mp3'), .5 ]

		},

		loops: {

			thrust: [ new Audio('/static/resources/sound/thrust2.mp3'), .5 ],
			pulse: [ new Audio('/static/resources/sound/pulse.mp3'), 1 ]

		},

		fade_in: function( audio, fade ){

			audio[0].currentTime = 0
			audio[0].volume = 0

			if( !int ){

				c = 0

				audio[0].play()

				int = setInterval( function(){

					console.log('fin')

					audio[0].volume += ( audio[1] / 4 )

					c++

					if( c >= 3 ) {
						clearInterval( int )
						int = false
					}

				}, fade / 4)

			}else{

				audio[0].play()

			}

		},

		fade_out: function( audio, fade ){

			if( !int ){

				c = 0

				volume_down = audio[1]

				int = setInterval( function(){

					console.log('fout')

					c++

					audio[0].volume = Math.max( 0, ( audio[0].volume - ( volume_down / 4 )))

					if( c >= 3 ) {
						clearInterval( int )
						audio[0].pause()
						int = false
					}

				}, fade / 4)

			}else{

				audio[0].pause()
				audio[0].currentTime = 0

			}

		}

	}





	Object.keys( sound ).forEach( cat => {

		Object.keys( sound[cat] ).forEach( s => {
			sound[cat][s][0].volume = sound[cat][s][1]
		})

	})

	Object.keys( sound.loops ).forEach( f => {
		sound.loops[f][0].setAttribute('loop', true)
	})

	return sound

})()




// card_sounds: {
// 	defender: [ new Audio('/static/resources/sound/swoosh1.mp3'), 1 ],
// 	jester: [ new Audio('/static/resources/sound/cards/jester.mp3'), 1 ],
// 	dryad: [ new Audio('/static/resources/sound/cards/dryad.mp3'), 1 ],
// 	assassin: [ new Audio('/static/resources/sound/cards/sheath_knife.mp3'), 1 ],
// 	archer: [ new Audio('/static/resources/sound/cards/archer.mp3'), 1 ],
// 	restoration: [ new Audio('/static/resources/sound/cards/dryad.mp3'), 1 ],
// 	shepherd: [ new Audio('/static/resources/sound/cards/shepherd.mp3'), 1 ],
// 	paladin: [ new Audio('/static/resources/sound/cards/paladin.mp3'), 1 ],
// 	pestilence: [ new Audio('/static/resources/sound/cards/pestilence.mp3'), 1 ],
// 	siren: [ new Audio('/static/resources/sound/cards/siren.mp3'), 1 ],
// 	wanderer: [ new Audio('/static/resources/sound/cards/step1.mp3'), 1 ],
// 	prisoner: [ new Audio('/static/resources/sound/coin_jingle.mp3'), 1 ],
// 	commoner: [ new Audio('/static/resources/sound/swoosh1.mp3'), 1 ]
// }

