import { isArray } from './is'
import { Func } from './types'

/**
 * Identity function, always return input itself
 *
 * @export
 * @template T
 * @param {T} self
 * @returns {T}
 */
export function identity<T>(self: T): T {
  return self
}

/**
 * A function that does nothing
 *
 * @export
 */
export function noop() {
  /* noop */
}

/**
 * Given an initmial argument and a list of functions, each function will be executed sequentially, and
 * the returned value is passed to the next function as argument.
 *
 * @deprecated {{in favor of compose}}{{}}
 * @export
 * @template T
 * @param {(any[] | any)} [args]
 * @param {...Func[]} funcs
 * @returns {T}
 */
export function flow<T = any>(args?: any[] | any, ...funcs: Func[]): T {
  if (funcs.length === 0) {
    return args
  }

  if (!isArray(args)) {
    args = [args]
  }

  return funcs.reduce((result, nextFunc) => {
    return result === args ? nextFunc(...result) : nextFunc(result)
  }, args)
}

export function compose<T = any>(...funcs: Func[]): (...args: any[]) => T {
  if (funcs.length === 0) {
    return identity
  }

  return (...args: any[]) =>
    funcs.reduce<any>((result, nextFunc) => {
      return result === args ? nextFunc(...result) : nextFunc(result)
    }, args)
}

/**
 * Simple try catch wrapper that returns a default value if exception was raised.
 * If silent = false, there will be a 'console.error' call.
 *
 * @export
 * @param {Func} func
 * @param {*} [defaultValue]
 * @param {boolean} [silent=true]
 * @returns {*}
 */
export function attempt<T, P extends T = any>(func: Func<T>, defaultValue?: P, silent: boolean = true): P extends T ? T : (T | undefined) {
  try {
    return func() as any
  } catch (e) {
    !silent && console.error(e)
    return defaultValue as any
  }
}

// function iThrowError<T>(arg: T): T {
//   if ('true') {
//     throw new Error()
//   }
//   return arg;
// }

// // type check
// let result1: number = attempt(() => iThrowError(1), 1)
// let result2: number | undefined = attempt(() => iThrowError(1))
// let result3: string = attempt(() => iThrowError('123'), '123')

// // @ts-expect-error
// let error: number = attempt(() => iThrowError(1))
// // @ts-expect-error
// let error2: number = attempt(() => iThrowError('123'))
// // @ts-expect-error
// let error3: number = attempt(() => iThrowError('123'), 123)