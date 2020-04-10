import { isArray } from './is';

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
export function ellipsis(str: string, limit: number): string {
  if (typeof str !== 'string') {
    throw new Error(`${JSON.stringify(str)} is not a string`);
  }

  return str.length > limit ? str.substring(0, limit) + '…' : str;
}

/**
 * Parse query string and return a key/value object
 *
 * @export
 * @param {any} queryString
 * @returns {any}
 */
export function parseQuery(queryString): any {
  let query = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  // tslint:disable-next-line:prefer-for-of
  for (let pair of pairs) {
    let [key, value] = pair.split('=');
    if (!key) continue;
    let prop = decodeURIComponent(key);
    let propVal = value === '' ? undefined : decodeURIComponent(value);
    if (query[prop]) {
      let val = query[prop];
      if (isArray(val)) {
        val.push(propVal);
      } else {
        query[prop] = [val, propVal];
      }
    } else {
      query[decodeURIComponent(key)] = propVal;
    }
  }
  return query;
}

/**
 * Like String.prototype.replace, except it replaces all occurrences
 *
 * @export
 * @param {string} target
 * @param {string} search
 * @param {string} replacement
 * @returns {string}
 */
export function replaceAll(target: string, search: string, replacement: string): string {
  return target.replace(new RegExp(search, 'g'), replacement);
}

/**
 * calculate hash (32bit integer) from a string
 * @param str
 */
export function hashOf(str: string | null = ''): number {
  let hash = 0,
    i,
    chr;
  if (str === null) {
    return hash;
  }
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

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
export function padding(origin: string | number, paddingContent: string, threshold: number, left = true): string {
  origin = String(origin);
  if (origin.length >= threshold) {
    return origin;
  }

  let paddingStr = Array(threshold - origin.length)
    .fill(paddingContent)
    .join('');
  return left ? paddingStr + origin : origin + paddingStr;
}

/**
 * Capitalize first char of a string
 *
 * @export
 * @param {string} origin
 * @returns {string} firstLetterCapitalized
 */
export function capitalizeFirst(origin: string): string {
  return origin.charAt(0).toUpperCase() + origin.slice(1);
}

/**
 * Strip HTML tags from a raw string
 *
 * @export
 * @param {string} origin
 * @returns {string} strippedString
 */
export function stripHtmlTags(origin: string): string {
  return origin.replace(/(<([^>]+)>)/gi, '');
}
