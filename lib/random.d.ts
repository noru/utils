/**
 * random with range
 *
 * e.g.:
 *   random()     // equal Math.random()
 *   random(3)    // a random number from 0 to 3
 *   random(1, 9) // a random number from 1 to 9
 *
 * @export
 * @param {(...[] | [number] | [number, number])} args
 * @returns {number}
 */
export declare function random(...args: [] | [number] | [number, number]): number;
/**
 * Like random, but return integer only
 *
 * @export
 * @param {(...[] | [number] | [number, number])} args
 * @returns {number}
 */
export declare function randomInt(...args: [] | [number] | [number, number]): number;
/**
 * Random boolean value
 *
 * @export
 * @param {any} args
 * @returns {boolean}
 */
export declare function randomBool(): boolean;
/**
 * Pick a random sample out of an array
 *
 * @export
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
export declare function sample<T>(array: T[]): T;
