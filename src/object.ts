/**
 * Is this object a simple type? null, undefine, string, num...
 *
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export function isSimpleType(obj: any): boolean {
  return null == obj || 'object' !== typeof obj
}
/**
 * Deep clone one object to another
 * @export
 * @param {*} source any
 * @returns any
 */
export function deepClone(source: any) {
  let target
  if (isSimpleType(source)) return source

  if (source instanceof Date) {
      target = new Date()
      target.setTime(source.getTime())
      return target
  }

  if (source instanceof Array) {
      target = []
      for ( let i = 0, len = source.length; i < len; i++ ) {
          target[i]  = deepClone(source[i])
        }
      return target
  }

  if (source instanceof Object) {
      target = {}
      for (let attr in source) {
          if (source.hasOwnProperty(attr)) target[attr] = deepClone(source[attr])
      }
      return target
  }
}
/**
 * Is object A equals to object B?
 *
 * @export
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
export function isObjectEqual(obj1: any, obj2: any) {
  if (isSimpleType(obj1)) return obj1 === obj2
  if (obj1 instanceof Date) return obj1.getTime === obj2.getTime

  if (obj1 instanceof Array) {
    if ( obj1.length !== obj2.length ) return false
    for ( let i = 0, len = obj1.length; i < len; i++ ) {
        if (!isObjectEqual(obj1[i], obj2[i])) return false
      }
    return true
    }

  if (obj1 instanceof Object) {
    for ( let attr in obj1) {
      if (!obj2.hasOwnProperty(attr)) return false
      if (!isObjectEqual(obj1[attr], obj2[attr])) return false
    }
    return true
  }

}

/**
 * Merge two Objects
 * for same properties, use the second object's value
 * @export
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
export function mergeObject(obj1: any, obj2: any) {
   if (obj1 instanceof Object && obj2 instanceof Object) {
    for (let attr in obj1) {
      if (!obj2.hasOwnProperty(attr)) obj2[attr] = obj1[attr]
    }
    return obj2
   }

}