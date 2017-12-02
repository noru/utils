
/**
 * Is this an array?
 *
 * @export
 * @param {*} testee
 * @returns {boolean}
 */
export function isArray(testee: any): boolean {

  if (Array.isArray) {
    return Array.isArray(testee)
  }

  return Object.prototype.toString.call(testee) === '[object Array]'

}

/**
 * Check if an array contains any elements.
 * null/undefined are considered empty.
 *
 * @export
 * @param {(any[] | undefined | null)} arr
 * @returns
 */
export function isNullOrEmpty(arr: any[] | undefined | null) {
  return arr === null || arr === undefined || arr.length === 0
}

/**
 * Like flatMap, this function walks through the nested(multi-demension) array.
 * This function keep the original demesions.
 * e.g.: deepMap([1, [2, 3]], x => x + 1) => [2, [3, 4]]
 *
 * @export
 * @param {any[]} deepArray
 * @param {(item: any, cord: number[], index: number) => any} iteratee
 * @returns
 */
export function deepMap(
  deepArray: any[],
  iteratee: (item: any, cord: number[], index: number) => any,
  pos: number[] = [],
  index: any = { i: 0 },
) {

  if (!isArray(deepArray)) {
    throw new Error(`Argument is not an array: ${deepArray}. position: ${pos}` )
  }

  return deepArray.map((item, i) => {

    if (isArray(item)) {
      return deepMap(item, iteratee, [...pos, i], index)
    } else {
      return iteratee(item, [...pos, i], index.i++)
    }

  })

}

/**
 * Shallow compare two arrays
 *
 * @export
 * @param {any[]} a
 * @param {any[]} b
 * @returns {boolean}
 */
export function shallowEqual(a: any[], b: any[]): boolean {

  if (a === b)                return true
  if (a == null || b == null) return false
  if (a.length !== b.length)  return false

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true

}