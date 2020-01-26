
/* eslint-disable */
const {Server} = require('@anzerr/http.server'),
	fs = require('@anzerr/fs.promisify'),
	url = require('url'),
	path = require('path');

class Static {

	constructor() {
		this.director = path.join(path.resolve(__dirname), 'dist');
		this._regex = new RegExp('^' + this.director.replace(/(\\|\.){1}/g, '\\$1'));
	}

	normalize(u) {
		const sanitizePath = path.normalize(url.parse(u).pathname).replace(/^(\.\.[\/\\])+/, '');
		const out = path.resolve(path.join(this.director, sanitizePath));
		if (out.match(this._regex)) {
			return out;
		}
		return this.director;
	}

	init() {
		const s = new Server(3000);
		s.create((req, res) => {
			if (req.method() === 'GET') {
				const dir = this.normalize(req.url());
				console.log(dir);
				return fs.stat(dir).then((r) => {
					if (!r.isDirectory()) {
						return res.set({
							'Content-Type': res.type(path.extname(dir))
						}).status(200).pipe(fs.createReadStream(dir));
					}
					throw new Error('not valid');
				}).catch((e) => {
					console.log(e);
					res.set({
						'Content-Type': res.type('.html')
					}).status(200).pipe(fs.createReadStream('dist/index.html'));
				});
			} else {
				res.status(200).send('');
			}
		}).then(() => {
			console.log('started server');
		});
	}

}

const s = new Static();
s.init();
