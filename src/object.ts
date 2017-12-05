export function deepClone(source: any) {
    let target
    // Handle 3 simple types
    if (null == source || 'object' !== typeof source) return source

    // Handle date
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
          if ( source.hasOwnProperty(attr)) target[attr] = deepClone(source[attr])
      }
      return target
  }
    throw new Error( 'Object type is not supported. Clone failed')
}