/**
 * Deep clone one object to another
 * @export
 * @param {*} source any
 * @returns any
 */
export function deepClone(source: any) {
    let target
    // Handle 3 simple types
    if (null == source || 'object' !== typeof source ) return source

    // Handle date ->not needed its an object
    if (source instanceof Date) {
        target = new Date()
        target.setTime(source.getTime())
        return target
    }

    // Handle array
    if (source instanceof Array) {
        target = []
        for ( let i = 0, len = source.length; i < len; i++ ) {
            target[i]  = deepClone(source[i])
        }
        return target
    }

  // Handle object
    if (source instanceof Object) {
      target = {}
      for (let attr in source) {
          if ( !source.hasOwnProperty(attr))  throw new Error( 'Object type is not supported. Clone failed')
          target[attr] = deepClone(source[attr])
      }
      return target
  }
   // throw new TypeError( 'Object type is not supported. Clone failed')
}