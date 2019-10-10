export declare class Simple {
    _comp: string;
    _class: string;
    _ref: string | void;
    _style: any;
    _core: any;
    _hook: any;
    constructor(comp: any);
    class(...arg: any[]): Simple;
    style(...arg: any[]): Simple;
    on(key: string, func: (e?: any, e1?: any) => any, bubble?: boolean): Simple;
    set(...arg: any[]): Simple;
    ref(ref: any): Simple;
    create(...arg: any[]): any;
    c(...arg: any[]): any;
}
export declare const r: (a: any) => any;
