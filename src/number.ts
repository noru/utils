
export function toPercentage(num: number, digit = 0) {
  return (num * 100).toFixed(digit) + '%'
}

export function isBetween(
  testee: number,
  min: number,
  max: number,
  inclusive: [boolean, boolean] = [true, true]) {

    let checkLeft = () => inclusive[0] ? testee >= min : testee > min
    let checkRight = () => inclusive[1] ? testee <= max : testee < min

    return checkLeft() && checkRight()

}