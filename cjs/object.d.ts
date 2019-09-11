import { Func } from './types';
export { shallowEqual } from './array';
/**
 * Deep clone one object
 * @export
 * @param {*} source any
 * @returns any
 */
export declare function recursiveCopy(source: any): any;
/**
 * Check whether A equals B
 *
 * @export
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
export declare function isEqual(obj1: any, obj2: any): boolean | undefined;
/**
 * Merge Objects from left to right
 * Array and plain object properties are merged recursively.
 * Other objects and value types are overridden by assignment
 * Subsequent object overwrite property assignments of previous object.
 *
 * @export
 * @param {...any[]} argument
 * @returns
 */
export declare function merge(...argument: any[]): any;
/**
 * Like lodash.flattenDeep, except it flattens an array property of an object. e.g.:
 * {
 *   id: 1,
 *   children: [
 *     {
 *       id: 2,
 *       children: [
 *         {
 *           id: 3
 *         }
 *       ]
 *     }
 *   ]
 * }
 * become:
 * [
 *   { id: 1, children: [...] },
 *   { id: 2, children: [...] },
 *   { id: 3 },
 * ]
 *
 * @export
 * @template T
 * @param {(T | T[])} obj target to be flattened
 * @param {(string | Func)} propNameOrGetter name or getter of the target array
 * @returns {T[]}
 */
export declare function flattenDeepBy<T>(obj: T | T[], propNameOrGetter: string | Func): T[];
/**
 * A simple version of lodash.defaults.
 * e.g.:
 * defaults({}, 'couldBeUndefined', { a: 1 }).countBeUndefined
 * // { a: 1 }
 * To avoid writing code like:
 * let val = obj.someProp
 * if (val === undefined) {
 *   val = obj.someProp = defaultValue
 * }
 *
 * @export
 * @template T
 * @param {T} original
 * @param {string | number} prop
 * @param {*} defaultVal
 * @returns {T} mutated original object
 */
export declare function defaults<T1 extends object, T2>(original: T1, prop: string | number, defaultVal: T2): T1 & {
    [prop: string]: T2;
};
