
import 'reflect-metadata';
import {Injectable} from '@anzerr/inject.ts';

@Injectable()
export class Store {

	_store: {[key: string]: any};

	constructor() {
		this._store = {};
	}

	get data(): any {
		return this._store;
	}

	set data(s) {
		this._store = s;
	}

	get(key): any {
		return this._store[key];
	}

	set(key, data): any {
		this._store[key] = data;
		return this;
	}

	add(key, i): any {
		this._store[key] = (this._store[key] || 0) + i;
		return this._store[key];
	}

}
