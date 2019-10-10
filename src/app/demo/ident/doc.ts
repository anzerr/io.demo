
export default [
	'![GitHub Actions status | linter](https://github.com/anzerr/ident.icon/workflows/linter/badge.svg)',
	'![GitHub Actions status | publish](https://github.com/anzerr/ident.icon/workflows/publish/badge.svg)',
	'![GitHub Actions status | test](https://github.com/anzerr/ident.icon/workflows/test/badge.svg)',
	'',
	'generate github styled identicon in svg format for a given hash.',
	'',
	'#### `Install`',
	'``` bash',
	'npm install --save git+https://git@github.com/anzerr/ident.icon.git',
	'npm install --save @anzerr/ident.icon',
	'```',
	'',
	'### `Class type`',
	'``` typescript',
	`Identicon {

	// "hash" needs to be a min of 15 char
	constructor(hash: string, option?: {
		background?: [number, number, number], // default value "[240, 240, 240, 255]" this is the background color
		size?: number, // default value "64" this is the size of the viewbox in the svg
		saturation?: number, // default value "0.7" value used in the the hsl color generate
		brightness?: number, // default value "0.5" value used in the the hsl color generate
		image?: any // default value "Svg" expects a class to handle drawing the image
	});

	render(): any; // init a "image" class and draw the Ident on the instance

	toString(raw?: boolean): string; // get the svg back as base64 or raw

}`,
	'```',
	'',
	'### `Example`',
	'``` javascript',
	`const Identicon = require('ident.icon'),
	fs = require('fs');

fs.writeFileSync('example.svg', new Identicon('e3d7bb56cd6a33ed').toString(true));`,
	'```',
	'### `Online demo`',
].join('\n');
