
export default [
'![GitHub Actions status | linter](https://github.com/anzerr/totp.util/workflows/linter/badge.svg)',
'![GitHub Actions status | publish](https://github.com/anzerr/totp.util/workflows/publish/badge.svg)',
'![GitHub Actions status | test](https://github.com/anzerr/totp.util/workflows/test/badge.svg)',
'',
'#### `Install`',
'``` bash',
'npm install --save git+https://git@github.com/anzerr/totp.util.git',
'npm install --save @anzerr/totp.util',
'```',
'### `Class type`',
'``` typescript',
`class Hotp {

	key: Buffer; // this is the secret key after it has been transformed and padded

	// "key" is the secret that you hash, "hash" is the hash typed used valid values are ['sha1', 'sha256', 'sha512']
	constructor(key: string, hash?: string);

	// "n" is the number used to hash in totp that is time, "size" is the code size the default is 6
	get(n: number, size?: number): string

	// "size" is the secret size {sha1: 20, sha256: 32, sha512: 64}
	static generate(size?: number): Hotp;

};

class Totp {

	key: Buffer; // this is the secret key after it has been transformed and padded

	// "key" is the secret that you hash, "hash" is the hash typed used valid values are ['sha1', 'sha256', 'sha512']
	constructor(key: string, hash?: string);

	// "n" the code for a given number, "size" by default is 6 it's the size of the output code
	getValue(n: number, size?: number): string;

	// "size" is the code size, "next" is how many next codes to generate
	get(options?: {size?: number, next?: number}): string | string[];

	// "size" is the secret size {sha1: 20, sha256: 32, sha512: 64}
	static generate(size?: number): Totp;

};`,
'```',
'',
'### `Console example script`',
'``` javascript',
`const {b32} = require('base.util'),
	{Totp} = require('totp.util'),
	Qr = require('qr.util');

const gen = new Totp('12345678901234567890'), o = {
	name: \`totp.util\${Math.random().toString(36)}\`,
	from: 'totp.util',
	secret: gen.key
};

// key format can be found at https://github.com/google/google-authenticator/wiki/Key-Uri-Format
let qr = new Qr(\`otpauth://totp/\${o.name}?secret=\${b32.encode(o.secret, true)}&issuer=\${o.from}\`);
console.log(qr.toConsole(true));

let last = null;
setInterval(() => {
	const cur = gen.get();
	if (last !== cur) {
		last = cur;
		console.log('current value: ', last);
	}
}, 200);`,
'```',
'### `Online demo`',
].join('\n');
