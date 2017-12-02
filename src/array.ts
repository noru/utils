
export function isArray(testee: any): boolean {

  if (Array.isArray) {
    return Array.isArray(testee)
  }

  return Object.prototype.toString.call(testee) === '[object Array]'

}

export function isNullOrEmpty(arr: any[] | undefined | null) {
  return arr === null || arr === undefined || arr.length === 0
}

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

export function shallowEqual(a, b) {

  if (a === b)                return true
  if (a == null || b == null) return false
  if (a.length !== b.length)  return false

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true

}