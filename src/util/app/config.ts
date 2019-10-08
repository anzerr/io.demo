
import 'reflect-metadata';
import {Injectable} from 'inject.ts';

@Injectable()
export class Config {

	get(): any {
		return {
			log: true,
			api: 'http://192.168.154.3:3003'
		};
	}

}
