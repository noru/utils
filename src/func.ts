import { isArray } from './array'

/**
 * Identity function, always return input itself
 *
 * @export
 * @param {any} self
 * @returns
 */
export function identity(self) { return self }

/**
 * A function that does nothing
 *
 * @export
 */
export function noop() { /* noop */ }

/**
 * Given an initmial argument and a list of functions, each function will be executed sequentially, and
 * the returned value is passed to the next function as argument.
 *
 * @export
 * @param {(any[] | any)} [args] can be a single value or a list of values
 * @param {..._Function[]} funcs
 * @returns {any}
 */
export function flow(args?: any[] | any, ...funcs: _Function[]): any {

  if (funcs.length === 0) {
    return args
  }

  if (!isArray(args)) {
    args = [ args ]
  }

  return funcs.reduce((result, nextFunc) => {
    return result === args ? nextFunc(...result) : nextFunc(result)
  }, args)

}

/**
 * Deprectated. Rename it to 'flow' as lodash
 *
 * @deprecated {{flow}}{{}}
 * @export
 * @param {(any[] | any)} [args] can be a single value or a list of values
 * @param {..._Function[]} funcs
 * @returns {any}
 */
export function apply(...args) {
  return flow(...args)
}

/**
 * Simple try catch wrapper that returns a default value if exception was raised
 *
 * @export
 * @param {() => any} func
 * @param {*} defaultValue
 * @returns {*}
 */
export function attempt(func: _Function, defaultValue?: any): any {
  try {
    return func()
  } catch {
    return defaultValue
  }
}

/**
 * Simple try catch wrapper that returns a default value if exception was raised
 *
 * @deprecated {{renamed to attempt}}{{}}
 * @export
 * @param {() => any} func
 * @param {*} defaultValue
 * @returns {*}
 */
export function Try(func: _Function, defaultValue?: any) {
  return attempt(func, defaultValue)
}