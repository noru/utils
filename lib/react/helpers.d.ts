import * as React from 'react';
export declare type ReactAttributes = React.HTMLAttributes<any> & JSX.IntrinsicAttributes;
export declare function appendClass<T extends {
    className: string;
}>(child: React.ReactChild, ...classes: string[]): string | number | React.ReactElement<T, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export declare function overrideProps<T extends ReactAttributes>(child: React.ReactChild, propsMapper: (props: T) => Partial<T>): string | number | React.ReactElement<T, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export declare function overrideEventhandler<T extends keyof GlobalEventHandlersEventMap>(child: React.ReactChild, eventName: T, deligator: (origin: React.EventHandler<React.SyntheticEvent>) => void): string | number | React.ReactElement<ReactAttributes, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
