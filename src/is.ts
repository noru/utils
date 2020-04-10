import { Func } from './types'

/**
 * Check argument is primitive or not
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export function isPrimitive(obj: any): boolean {
  return null == obj || 'object' !== typeof obj
}

/**
 * To test if the input is a number
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
export function isNumber(testee: unknown): testee is number {
  return typeof testee === 'number'
}

/**
 * To test if the input is a string
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
export function isString(testee: unknown): testee is string {
  return typeof testee === 'string'
}

/**
 * To test if the input is a boolean
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
export function isBoolean(testee: unknown): testee is boolean {
  return typeof testee === 'boolean'
}

/**
 * To test if the input is a function
 *
 * @export
 * @param {*} testee
 * @returns {testee is number}
 */
export function isFunction(testee: unknown): testee is Func {
  return typeof testee === 'function'
}

/**
 * To test if an argument is an Array
 *
 * @export
 * @param {*} testee
 * @returns {boolean}
 */
export function isArray<T = any>(testee: unknown): testee is T[] {
  if (Array.isArray) {
    return Array.isArray(testee)
  }

  return Object.prototype.toString.call(testee) === '[object Array]'
}

/**
 * Check input param is undefined or null
 *
 * @param {*} param
 * @returns {boolean}
 */
export function isUndefinedOrNull(param: unknown): boolean {
  return param === null || param === undefined
}

/**
 *  Check input param is "Empty": undefined or null or {}, []
 *
 * @export
 * @param {any} obj
 * @returns {boolean}
 */
export function isEmpty(obj: any): boolean {

  // null and undefined are "empty"
  if (obj == null) return true

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false
  if (obj.length === 0)  return true

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return false

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (let key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) return false
  }

  return true
}
