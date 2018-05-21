/**
 * Make a long string shorter and end with "…"
 *
 * e.g.: ellipsis('helloworld!', 5) // "hello…"
 *
 * @export
 * @param {string} str
 * @param {number} limit chars to keep
 * @returns {string}
 */
export declare function ellipsis(str: string, limit: number): string;
/**
 * Parse query string and return a key/value object
 *
 * @export
 * @param {any} queryString
 * @returns {any}
 */
export declare function parseQuery(queryString: any): any;
/**
 * Like String.prototype.replace, except it replaces all occurrences
 *
 * @export
 * @param {string} target
 * @param {string} search
 * @param {string} replacement
 * @returns {string}
 */
export declare function replaceAll(target: string, search: string, replacement: string): string;
/**
 * calculate hash (32bit integer) from a string
 * @param str
 */
export declare function hashOf(str?: string | null): number;
