/**
 * random with range
 *
 * e.g.:
 *   random()     // equal Math.random()
 *   random(3)    // a random number from 0 to 3
 *   random(1, 9) // a random number from 1 to 9
 *
 * @export
 * @param {(...[] | [number] | [number, number])} args
 * @returns {number}
 */
export function random(...args: [] | [number] | [number, number]): number {
  if (args[0] === undefined) {
    return Math.random()
  }
  if (args.length === 1) {
    return Math.random() * args[0]
  }
  let [low, high] = args as [number, number]
  return Math.random() * (high - low) + low
}

/**
 * Like random, but return integer only
 *
 * @export
 * @param {(...[] | [number] | [number, number])} args
 * @returns {number}
 */
export function randomInt(...args: [] | [number] | [number, number]): number {
  return Math.round(random(...args))
}

/**
 * Random boolean value
 *
 * @export
 * @param {any} args
 * @returns {boolean}
 */
export function randomBool(): boolean {
  return Math.random() > 0.5
}
