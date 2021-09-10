import { Func } from './types';
/**
 * Identity function, always return input itself
 *
 * @export
 * @template T
 * @param {T} self
 * @returns {T}
 */
export declare function identity<T>(self: T): T;
/**
 * A function that does nothing
 *
 * @export
 */
export declare function noop(): void;
/**
 * Given an initmial argument and a list of functions, each function will be executed sequentially, and
 * the returned value is passed to the next function as argument.
 *
 * @deprecated {{in favor of compose}}{{}}
 * @export
 * @template T
 * @param {(any[] | any)} [args]
 * @param {...Func[]} funcs
 * @returns {T}
 */
export declare function flow<T = any>(args?: any[] | any, ...funcs: Func[]): T;
export declare function compose<T = any>(...funcs: Func[]): (...args: any[]) => T;
/**
 * Simple try catch wrapper that returns a default value if exception was raised.
 * If silent = false, there will be a 'console.error' call.
 *
 * @export
 * @param {Func} func
 * @param {*} [defaultValue]
 * @param {boolean} [silent=true]
 * @returns {*}
 */
export declare function attempt<T, P extends T = any>(func: Func<T>, defaultValue?: P, silent?: boolean): P extends T ? T : (T | undefined);
