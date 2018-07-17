/// <reference path="src/global.d.ts" />
/**
 * Identity function, always return input itself
 *
 * @export
 * @param {any} self
 * @returns
 */
export declare function identity(self: any): any;
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
 * @export
 * @param {(any[] | any)} [args] can be a single value or a list of values
 * @param {..._Function[]} funcs
 * @returns {any}
 */
export declare function flow(args?: any[] | any, ...funcs: _Function[]): any;
/**
 * Deprectated. Rename it to 'flow' as lodash
 *
 * @deprecated {{flow}}{{}}
 * @export
 * @param {(any[] | any)} [args] can be a single value or a list of values
 * @param {..._Function[]} funcs
 * @returns {any}
 */
export declare function apply(...args: any[]): any;
/**
 * Simple try catch wrapper that returns a default value if exception was raised
 *
 * @export
 * @param {() => any} func
 * @param {*} defaultValue
 * @returns {*}
 */
export declare function attempt(func: _Function, defaultValue?: any): any;
/**
 * Simple try catch wrapper that returns a default value if exception was raised
 *
 * @deprecated {{renamed to attempt}}{{}}
 * @export
 * @param {() => any} func
 * @param {*} defaultValue
 * @returns {*}
 */
export declare function Try(func: _Function, defaultValue?: any): any;
