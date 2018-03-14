
export { shallowEqual } from './array'

/**
 * Check argument is premitive or not
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export function isPremitive(obj: any): boolean {
  return null == obj || 'object' !== typeof obj
}

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
 * Check input param is undefined or null
 *
 * @param {*} param
 * @returns {boolean}
 */
function isUndefinedOrNull(param: any): boolean {
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