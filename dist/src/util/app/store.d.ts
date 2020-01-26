import 'reflect-metadata';
export declare class Store {
    _store: {
        [key: string]: any;
    };
    constructor();
    get data(): any;
    set data(s: any);
    get(key: any): any;
    set(key: any, data: any): any;
    add(key: any, i: any): any;
}
