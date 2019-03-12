import { isArray, isPremitive, isUndefinedOrNull, isEmpty } from './is'
import { Func } from './types'
export { shallowEqual } from './array'

/**
 * Deep clone one object
 * @export
 * @param {*} source any
 * @returns any
 */
export function recursiveCopy(source: any) {

  let target
  if (isPremitive(source)) return source

  if (source instanceof Date) {
      target = new Date()
      target.setTime(source.getTime())
      return target
  }

  if (source instanceof Array) {
      target = []
      for ( let i = 0, len = source.length; i < len; i++ ) {
          target[i]  = recursiveCopy(source[i])
        }
      return target
  }

  if (source instanceof Object) {
      target = {}
      for (let attr in source) {
          if (source.hasOwnProperty(attr)) {
            target[attr] = recursiveCopy(source[attr])
          }
      }
      return target
  }
}
/**
 * Check whether A equals B
 *
 * @export
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
export function isEqual(obj1: any, obj2: any) {

  if (obj1 === obj2) return true

  if (isPremitive(obj1)) return obj1 === obj2

  if (obj1 instanceof Date) return obj1.getTime() === obj2.getTime()

  if (obj1 instanceof Array) {
    if ( obj1.length !== obj2.length ) return false
    for ( let i = 0, len = obj1.length; i < len; i++ ) {
        if (!isEqual(obj1[i], obj2[i])) return false
      }
    return true
    }

  if (obj1 instanceof Object) {
    for ( let attr in obj1) {
      if (!obj2.hasOwnProperty(attr)) return false
      if (!isEqual(obj1[attr], obj2[attr])) return false
    }
    return true
  }

}

/**
 * Merge Objects from left to right
 * Array and plain object properties are merged recursively.
 * Other objects and value types are overridden by assignment
 * Subsequent object overwrite property assignments of previous object.
 *
 * @export
 * @param {...any[]} argument
 * @returns
 */
export function merge(...argument: any[]) {
  return argument.reduce(function(obj1: any, obj2: any) {
    if (!isPremitive(obj1) && !isPremitive(obj2)) {
      for (let attr in obj2) {
        obj1[attr] = merge(obj1[attr], obj2[attr])
      }
      return obj1
    }

    if (isUndefinedOrNull(obj1) || isUndefinedOrNull(obj2)) {
      return obj1 || obj2
    }
    obj1 = obj2
    return obj1
  })
}

/**
 * Like lodash.flattenDeep, except it flattens an array property of an object. e.g.:
 * {
 *   id: 1,
 *   children: [
 *     {
 *       id: 2,
 *       children: [
 *         {
 *           id: 3
 *         }
 *       ]
 *     }
 *   ]
 * }
 * become:
 * [
 *   { id: 1, children: [...] },
 *   { id: 2, children: [...] },
 *   { id: 3 },
 * ]
 *
 * @export
 * @template T
 * @param {(T | T[])} obj target to be flattened
 * @param {(string | Func)} propNameOrGetter name or getter of the target array
 * @returns {T[]}
 */
export function flattenDeepBy<T>(obj: T | T[], propNameOrGetter: string | Func ): T[] {

  if (isEmpty(obj) || typeof obj === 'number' || typeof obj === 'string') {
    return []
  }

  if (!isArray(obj)) {
    obj = [obj]
  }
  if (typeof propNameOrGetter === 'string') {
    let _propStr = propNameOrGetter
    propNameOrGetter = o => o[_propStr]
  }
  let result = new Array
  while (obj.length > 0) {
    let head = obj.shift()
    result.push(head)
    let propVal = propNameOrGetter(head)
    if (isArray(propVal)) {
      obj = propVal.concat(obj)
    }
  }
  return result
}

/**
 * A simple version of lodash.defaults.
 * e.g.:
 * defaults({}, 'couldBeUndefined', { a: 1 }).countBeUndefined
 * // { a: 1 }
 * To avoid writing code like:
 * let val = obj.someProp
 * if (val === undefined) {
 *   val = obj.someProp = defaultValue
 * }
 *
 * @export
 * @template T
 * @param {T} original
 * @param {string | number} prop
 * @param {*} defaultVal
 * @returns {T} mutated original object
 */
export function defaults<T1 extends object, T2>(
  original: T1,
  prop: string | number,
  defaultVal: T2,
): T1 & { [prop: string]: T2 } {

  if (typeof original !== 'object') {
    throw Error(`Original input must be an object, not ${typeof original}`)
  }
  let val = original[prop]
  if (val === undefined) {
    original[prop] = defaultVal
  }
  return original as any
}
