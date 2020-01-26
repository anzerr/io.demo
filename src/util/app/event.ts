
import 'reflect-metadata';
import {Injectable} from '@anzerr/inject.ts';
import * as events from 'events';

@Injectable()
export class Event extends events {

	constructor() {
		super();
		this.setMaxListeners(500);
	}

}
