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
/**
 * Padding a string or number with assigned content
 *
 * @export
 * @param {(string | number)} origin target string
 * @param {string} paddingContent, can be more than 1 char, however this function does not trim
 * @param {number} threshold target length with padding
 * @param {boolean} [left=true] padding left or right
 * @returns {string}
 */
export declare function padding(origin: string | number, paddingContent: string, threshold: number, left?: boolean): string;
/**
 * Capitalize first char of a string
 *
 * @export
 * @param {string} origin
 * @returns {string} firstLetterCapitalized
 */
export declare function capitalizeFirst(origin: string): string;
/**
 * Strip HTML tags from a raw string
 *
 * @export
 * @param {string} origin
 * @returns {string} strippedString
 */
export declare function stripHtmlTags(origin: string): string;
/**
 * Compare 2 strings witch case ignored by default
 * @param str1
 * @param str2
 * @param ignoreCase
 * @returns
 */
export declare function isStrEqual(str1: any, str2: any, ignoreCase?: boolean): boolean;
