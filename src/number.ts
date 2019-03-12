/**
 * Convert a number to percentage
 * e.g.: 0.98 => 98%
 *
 * @export
 * @param {number} num
 * @param {number} [digit=0] digits to keep
 * @returns
 */
export function toPercentage(num: number, digit = 0) {
  return (num * 100).toFixed(digit) + '%'
}

/**
 * Test if a number is within a range
 *
 * @export
 * @param {number} testee
 * @param {number} min
 * @param {number} max
 * @param {[boolean, boolean]} [inclusive=[true, true]] [left, right] side inclusive or not
 * @returns
 */
export function isBetween(testee: number, min: number, max: number, inclusive: [boolean, boolean] = [true, true]) {
  let checkLeft = () => (inclusive[0] ? testee >= min : testee > min)
  let checkRight = () => (inclusive[1] ? testee <= max : testee < max)
  return checkLeft() && checkRight()
}
