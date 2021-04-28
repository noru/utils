export type Func<T = unknown> = (...args: any[]) => T
export type Func0<T = unknown> = () => T
export type Func1<T = unknown> = (arg1: any) => T
export type Func2<T = unknown> = (arg1: any, arg2: any) => T
export type Func3<T = unknown> = (arg1: any, arg2: any, arg3: any) => T
export type Func4<T = unknown> = (arg1: any, arg2: any, arg3: any, arg4: any) => T

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T]
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type View<K extends string, V = unknown> = { [_ in K]: V }
export type Overwrite<T1, T2> = { [P in Exclude<keyof T1, keyof T2>]: T1[P] } & T2
export type ParamType<T> = T extends (...args: infer P) => any ? P : T;
export type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;