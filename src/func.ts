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

type _Function = (...args: any[]) => any
/**
 * Given an initmial argument and a list of functions, each function will be executed sequentially, and
 * the returned value is passed to the next function as argument.
 *
 * @export
 * @param {(any[] | any)} [args] can be a single value or a list of values
 * @param {..._Function[]} funcs
 * @returns {any}
 */
export function apply(args?: any[] | any, ...funcs: _Function[]): any {

  if (funcs.length === 0) {
    return args
  }

  if (!isArray(args)) {
    args = [ args ]
  }

  return funcs.reduce((left, right) => {
    return left === args ? right(...left) : right(left)
  }, args)

}

/**
 * Simple try catch wrapper that returns a default value if exception was raised
 *
 * @export
 * @param {() => any} func
 * @param {*} defaultValue
 * @returns {*}
 */
export function Try(func: _Function, defaultValue?: any): any {
  try {
    return func()
  } catch {
    return defaultValue
  }
}