import * as React from 'react';
import { Simple } from './simple';
import { Main } from './app/index';
export declare const app: Main;
export declare class Component extends React.Component<any, any> {
    _hooks: any;
    _dead: boolean;
    app: Main;
    create: (a: any) => Simple;
    props: any;
    state: any;
    refs: any;
    constructor(props: any);
    setState(...arg: any[]): any;
    event(name: any, cd: any): any;
    componentWillUnmount(): any;
}
