/**
 * random with range
 *
 * e.g.:
 *   random()     // equal Math.random()
 *   random(3)    // a random number from 0 to 3
 *   random(1, 9) // a random number from 1 to 9
 *
 * @export
 * @param {any} args
 * @returns {number}
 */
export declare function random(...args: any[]): number;
/**
 * Like random, but return integer only
 *
 * @export
 * @param {any} args
 * @returns {number}
 */
export declare function randomInt(...args: any[]): number;
/**
 * Random boolean value
 *
 * @export
 * @param {any} args
 * @returns {boolean}
 */
export declare function randomBool(): boolean;
