
import 'reflect-metadata';
import {Injectable, Inject} from 'inject.ts';
import {Config} from './config';

@Injectable()
export class Log {

	count: number;

	constructor(@Inject(Config) config: Config) {
		this.count = config.get().start;
	}

	info(...arg): any {
		this.count += 1;
		return console.log(this.count, ...arg);
	}

}
