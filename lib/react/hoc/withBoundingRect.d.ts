import React from 'react';
export interface BoundingClientRect {
    width: number;
    height: number;
    left: number;
    right: number;
    top: number;
    bottom: number;
}
interface Config {
    debounceFunc: (func: () => void) => () => void;
    delay: number;
}
export declare function withBoundingRect(config?: Partial<Config>): (Component: any) => React.ComponentClass<{
    clientRect: BoundingClientRect;
}, any>;
export {};
