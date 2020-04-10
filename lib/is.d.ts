import { Func } from './types';
/**
 * Check argument is primitive or not
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export declare function isPrimitive(obj: any): boolean;
/**
 * To test if the input is a number
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
export declare function isNumber(testee: unknown): testee is number;
/**
 * To test if the input is a string
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
export declare function isString(testee: unknown): testee is string;
/**
 * To test if the input is a boolean
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
export declare function isBoolean(testee: unknown): testee is boolean;
/**
 * To test if the input is a function
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
export declare function isFunction(testee: unknown): testee is Func;
/**
 * To test if an argument is an Array
 *
 * @export
 * @param {*} testee
 * @returns {boolean}
 */
export declare function isArray<T = any>(testee: unknown): testee is T[];
/**
 * Check input param is undefined or null
 *
 * @param {*} param
 * @returns {boolean}
 */
export declare function isUndefinedOrNull(param: unknown): boolean;
/**
 *  Check input param is "Empty": undefined or null or {}, []
 *
 * @export
 * @param {any} obj
 * @returns {boolean}
 */
export declare function isEmpty(obj: any): boolean;
