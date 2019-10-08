
import 'reflect-metadata';
import {Injectable, Inject} from 'inject.ts';
import is from 'type.util';
import {Store} from './store';

@Injectable()
export class Route {

	@Inject(Store)
	store: Store;

	_list: any;
	_data: any;
	_skip: any;

	constructor() {
		this._list = [];
		this._data = {};
		this._skip = null;
	}

	add(path, cd, param?): any {
		const base = path.replace(/\//g, '\\/');
		let url = base;
		for (const i in param) {
			url = url.replace(':' + i, param[i]);
			param[i] = '^' + base.replace(':' + i, '(' + param[i] + ')').replace(/\/:[a-zA-Z0-9]*/g, '/.*') + '$';
		}
		path = '^' + url + '$';
		this._list.push({
			path: path,
			cd: cd,
			param: param
		});
		return (this);
	}

	getData(key): any {
		if (is.defined(key)) {
			return (this._data[key] || null);
		}
		return (this._data);
	}

	run(a): any {
		const url = ('/' + (a || '')).replace(/\/{2,}/g, '/');

		if (a === this._skip) {
			this._skip = null;
			return false;
		}

		for (const i in this._list) {
			if (url.match(this._list[i].path)) {
				const data = {};
				let tmp = null;
				for (const x in this._list[i].param) {
					tmp = RegExp(this._list[i].param[x]).exec(url);
					if (tmp) {
						data[x] = tmp[1];
					}
				}
				this._data = data;
				this._list[i].cd(data);
				return true;
			}
		}

		return false;
	}

	redirect(url): any {
		history.pushState(this.store.data, '', url);
		this.run(url);
		return (this);
	}

}
