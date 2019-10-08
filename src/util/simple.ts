
import * as React from 'react';
import is from 'type.util';
import util from './util';

export class Simple {

	_comp: string;
	_class: string;
	_ref: string | void;
	_style: any;
	_core: any;
	_hook: any;

	constructor(comp: any) {
		this._comp = comp;
		this._class = '';
		this._ref = null;
		this._style = {};
		this._core = {};
		this._hook = {};
	}

	class(...arg: any[]): Simple {
		for (const i in arg) {
			if (is.string(arg[i])) {
				this._class = `${this._class} ${arg[i].trim()}`;
			}
		}
		return this;
	}

	style(...arg: any[]): Simple {
		for (const i in arg) {
			if (is.object(arg[i])) {
				this._style = {...this._style, ...arg[i]};
			}
		}
		return this;
	}

	on(key: string, func: (e?: any, e1?: any) => any, bubble = false): Simple {
		const event = (key.match(/^on[A-Z]/)) ? key : 'on' + util.upperFist(key);
		this._hook[event] = (e, data) => {
			const a = func(e, data);
			if (!bubble && e && e.stopPropagation && e.preventDefault) {
				e.stopPropagation();
				e.preventDefault();
			}
			return (a);
		};
		return this;
	}

	set(...arg: any[]): Simple {
		for (const i in arg) {
			if (is.object(arg[i])) {
				this._core = {...this._core, ...arg[i]};
			}
		}
		return this;
	}

	ref(ref: any): Simple {
		this._ref = ref;
		return this;
	}

	create(...arg: any[]): any {
		let data: any = {style: this._style};
		const c = this._class.trim();
		if (c !== '') {
			data._className = c;
		}
		if (this._ref) {
			data.ref = this._ref;
		}
		['_hook', '_core'].forEach((key) => (data = {...data, ...this[key]}));
		for (const i in arg) {
			if (arg[i] instanceof Simple) {
				arg[i] = arg[i].c();
			}
		}
		return React.createElement(this._comp, data, ...arg);
	}

	c(...arg: any[]): any {
		return this.create(...arg);
	}

}

export const r = (a: any): any => new Simple(a);
