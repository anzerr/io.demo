
import 'reflect-metadata';
import {Injectable, Inject} from 'inject.ts';
import {Store} from './store';
import {Event} from './event';
import {Config} from './config';
import {Log} from './log';
import {Route} from './route';

@Injectable()
export class Main {

	@Inject(Store)
	store: Store;

	@Inject(Config)
	config: Config;

	@Inject(Event)
	event: Event;

	@Inject(Log)
	logger: Log;

	@Inject(Route)
	route: Route;

}
