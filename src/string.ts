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
