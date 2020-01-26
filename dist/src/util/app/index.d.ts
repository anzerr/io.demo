import 'reflect-metadata';
import { Store } from './store';
import { Event } from './event';
import { Config } from './config';
import { Log } from './log';
import { Route } from './route';
export declare class Main {
    store: Store;
    config: Config;
    event: Event;
    logger: Log;
    route: Route;
}
