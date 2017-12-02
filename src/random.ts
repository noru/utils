
/**
 * random with range
 *
 * e.g.:
 *   random()     // equal Math.random()
 *   random(3)    // a random number from 0 to 3
 *   random(1, 9) // a random number from 1 to 9
 *
 * @export
 * @param {any} args
 * @returns {number}
 */
export function random(...args): number {

    if (args[0] === undefined) {
      return Math.random()
    }
    if (args.length === 1) {
      return Math.random() * args[0]
    }

    return Math.random() * (args[1] - args[0]) + args[0]
  }

/**
 * Like random, but return integer only
 *
 * @export
 * @param {any} args
 * @returns {number}
 */
export function randomInt(...args): number {
  return Math.round(random(...args))
}