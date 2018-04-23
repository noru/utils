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
    throw new Error(`${JSON.stringify(str)} is not a string`)
  }

  return str.length > limit ? str.substring(0, limit) + '…' : str
}

/**
 * Parse query string and return a key/value object
 *
 * @export
 * @param {any} queryString
 * @returns {any}
 */
export function parseQuery(queryString): any {
  let query = {}
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  // tslint:disable-next-line:prefer-for-of
  for (let pair of pairs) {
    let [key, value] = pair.split('=')
    if (!key) continue
    query[decodeURIComponent(key)] = decodeURIComponent(value || '')
  }
  return query
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
  return target.replace(new RegExp(search, 'g'), replacement)
}