import 'reflect-metadata';
import { Config } from './config';
export declare class Log {
    count: number;
    constructor(config: Config);
    info(...arg: any[]): any;
}
