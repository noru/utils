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
 * @returns {object}
 */
export function parseQuery(queryString): object {
  let query: object = {}
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  // tslint:disable-next-line:prefer-for-of
  for (let pair of pairs) {
    let [key, value] = pair.split('=')
    if (!key) continue
    query[decodeURIComponent(key)] = decodeURIComponent(value || '')
  }
  return query
}