export declare type Func<T = unknown> = (...args: any[]) => T;
export declare type Func0<T = unknown> = () => T;
export declare type Func1<T = unknown> = (arg1: any) => T;
export declare type Func2<T = unknown> = (arg1: any, arg2: any) => T;
export declare type Func3<T = unknown> = (arg1: any, arg2: any, arg3: any) => T;
export declare type Func4<T = unknown> = (arg1: any, arg2: any, arg3: any, arg4: any) => T;
export declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type View<K extends string, V = unknown> = {
    [_ in K]: V;
};
export declare type Overwrite<T1, T2> = {
    [P in Exclude<keyof T1, keyof T2>]: T1[P];
} & T2;
