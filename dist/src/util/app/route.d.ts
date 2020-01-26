import 'reflect-metadata';
import { Store } from './store';
export declare class Route {
    store: Store;
    _list: any;
    _data: any;
    _skip: any;
    constructor();
    add(path: any, cd: any, param?: any): any;
    getData(key: any): any;
    run(a: any): any;
    redirect(url: any): any;
}
