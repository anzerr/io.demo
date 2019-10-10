import 'reflect-metadata';
export declare class Store {
    _store: {
        [key: string]: any;
    };
    constructor();
    data: any;
    get(key: any): any;
    set(key: any, data: any): any;
    add(key: any, i: any): any;
}
