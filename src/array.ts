import { isNumber } from './number'

/**
 * To test if an argument is an Array
 *
 * @export
 * @param {*} testee
 * @returns {boolean}
 */
export function isArray(testee: any): testee is any[] {

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
 * Shallow compare two arrays/objects
 *
 * @export
 * @param {(object | any[])} a
 * @param {(object | any[])} b
 * @returns {boolean}
 */
export function shallowEqual(a: object | any[], b: object | any[]): boolean {

  if (a === b)                return true
  if (a == null || b == null) return false
  if ((a as any[]).length !== (b as any[]).length)  return false

  for (let i in a) {
    if (a[i] !== b[i]) return false
  }
  return true

}
/**
 * Swap value of array's two postions
 *
 * @export
 * @param {any[]} arr
 * @param {*} pos1
 * @param {*} pos2
 * @returns arr
 */
export function swap(arr: any[], pos1: number | number[], pos2: number | number[]): void {

  if (isNumber(pos1)) pos1 = [ pos1 ]
  if (isNumber(pos2)) pos2 = [ pos2 ]

  let parent1: any = {}
  let parent2: any = {}
  let val1 = pick(arr, ...pos1, parent1) // pick (arr, 1,2,3 ,parent1)
  let val2 = pick(arr, ...pos2, parent2)

  parent1.parent[pos1[pos1.length - 1]] = val2
  parent2.parent[pos2[pos2.length - 1]] = val1

}

/**
 * Pick a value from a deep array by its indices.
 * e.g.: pick(arr, 1, 2, 3) = arr[1][2][3]
 * if an array is supplied as the last parameter, it will be filled with arrays in each level
 * e.g.: [rootArray, subArray, ..., parentArray]
 * @export
 * @param {any[]} array
 * @param {any} indices target value indices in a deep array. e.g. the indice of value `arr[i1][i2][i3]` is [i1, i2, i3]
 * the last one can be an empty array to hold parents in each level
 * @returns {any}
 */
export function pick(array: any[], ...indices): any {

  let last = indices.pop()
  if (!isArray(last)) {
    indices.push(last)
    last = undefined
  }

  if (indices.length === 1) {
    let [ i ] = indices
    if (typeof i !== 'number') {
      throw Error(`Index ${i} is not a number`)
    }
    if (array !== undefined && array.length > i) {
      return array[i]
    }
    throw Error(`Out of bound`)
  }

  let [ first, ...rest ] = indices
  last && last.push(array[first]) && rest.push(last)
  return pick(array[first], ...rest)
}

export function unflatten<T>(
  arr: T[],
  key: string,
  connector: string | string[],
  level: number = Infinity,
): T {

  return {} as T
}