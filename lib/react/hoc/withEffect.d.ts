import React from 'react';
declare type Effect = () => () => void;
export declare function withEffect(effect: Effect): (Component: any) => React.ComponentClass<unknown, any>;
export {};
