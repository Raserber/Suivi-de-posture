import { TextureLoader } from 'three';
import { BODY_COLORS, cos, cossers, sin } from '../globals.js';
import { ParametricShape } from './ParametricShape.js';

import IUT1_texture from "../../img/IUT1_texture.png"

const texture = new TextureLoader().load(IUT1_texture)
// torso shape as parametric surface
class TorsoShape extends ParametricShape {

	constructor( feminine, params ) {

		var x = params[ 0 ],
			y = params[ 1 ],
			z = params[ 2 ],
			alpha = params[ 3 ],
			dAlpha = params[ 4 ],
			offset = params[ 5 ],
			scale = params[ 6 ];
		super( texture, BODY_COLORS.TORSO, function ( u, v, target ) {

			var r = offset + scale * cos( alpha + dAlpha * u );
			if ( feminine ) r += cossers( u, v, [
				[ 0.35, 0.85, 0.7, 0.95, 2 ],
				[ 0.35, 0.85, 0.55, 0.8, 2 ]
			]) - 1;
			v = 360 * v + 90;
			var x1 = x * ( 0.3 + r ) * cos( v ) / 2,
				y1 = y * u,
				z1 = z * r * sin( v ) / 2;
			var x2 = x * cos( v ) * cos( 180 * u - 90 ) / 2,
				y2 = y * ( 1 / 2 + sin( 180 * u - 90 ) / 2 ),
				z2 = z * sin( v ) * cos( 180 * u - 90 ) / 2;
			var k = Math.pow( Math.abs( 2 * u - 1 ), 16 ),
				kx = Math.pow( Math.abs( 2 * u - 1 ), 2 );
			if ( x2 < 0 ) kx = k;
			target.set( x1 * ( 1 - kx ) + kx * x2, y1 * ( 1 - k ) + k * y2 - y/2, z1 * ( 1 - k ) + k * z2 );

		}, 30, 20 );

		this.addSphere( 2, -y / 2 );

		this.name = 'TorsoShape';

	} // TorsoShape.constructor

} // TorsoShape


export { TorsoShape };
