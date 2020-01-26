
import * as React from 'react';
import {Module} from '@anzerr/inject.ts';
import {Simple} from './simple';
import {Main} from './app/index';

export const app: Main = new Module([Main]).build()[0];

export class Component extends React.Component<any, any> {

	_hooks: any;
	_dead: boolean;
	app: Main;
	create: (a: any) => Simple;

	props: any;
	state: any;
	refs: any;

	constructor(props) {
		super(props);
		this.create = (a) => new Simple(a);
		this._hooks = {map: {}, list: []};
		this.app = app;
	}

	setState(...arg): any {
		return super.setState(...arg);
	}

	event(name, cd): any {
		this._hooks.list.push([name, cd]);
		this._hooks.map[name] = true;
		this.app.event.on(name, (...arg) => {
			if (!this._dead) {
				cd(...arg);
			}
		});
		return this;
	}

	componentWillUnmount(): any {
		this._dead = true;
		for (const i in this._hooks.list) {
			this.app.event.removeListener(this._hooks.list[i][0], this._hooks.list[i][1]);
		}
	}

}
